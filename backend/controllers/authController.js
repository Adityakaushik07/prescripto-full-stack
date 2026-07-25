import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';

// Shared JWT options — every token carries the user id + role and expires in 7 days.
const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/v1/auth/register
// Only patients register themselves — doctors are added by admin, admin is env-based.
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing details' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Please enter a strong password' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({ name, email, password: hashedPassword });
    const token = signToken(newUser._id, 'patient');

    res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: 'patient' },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/v1/auth/login
// A "role" field in the body selects which identity to authenticate against.
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Missing credentials' });
    }

    // Admin credentials live in env variables — there is no admin collection.
    if (role === 'admin') {
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = signToken('admin', 'admin');
        return res.json({
          success: true,
          token,
          user: { id: 'admin', name: 'Admin', email, role: 'admin' },
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (role === 'doctor') {
      const doctor = await doctorModel.findOne({ email });
      if (!doctor) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const token = signToken(doctor._id, 'doctor');
      return res.json({
        success: true,
        token,
        user: { id: doctor._id, name: doctor.name, email: doctor.email, role: 'doctor' },
      });
    }

    // Default: patient login
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = signToken(user._id, 'patient');
    return res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: 'patient' },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};