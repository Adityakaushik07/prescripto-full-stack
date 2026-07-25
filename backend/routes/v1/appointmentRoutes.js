import express from 'express';
import auth from '../../middleware/auth.js';
import roleCheck from '../../middleware/roleCheck.js';
import upload from '../../middleware/multer.js';
import {
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  verifyStripe,
} from '../../controllers/userController.js';

const router = express.Router();

// Patient-only routes — identity comes from req.user.id set by auth middleware
router.get('/profile', auth, roleCheck('patient'), getProfile);
router.post('/profile', auth, roleCheck('patient'), upload.single('image'), updateProfile);
router.post('/book', auth, roleCheck('patient'), bookAppointment);
router.get('/', auth, roleCheck('patient'), listAppointment);
router.post('/cancel', auth, roleCheck('patient'), cancelAppointment);
router.post('/payment-razorpay', auth, roleCheck('patient'), paymentRazorpay);
router.post('/verify-razorpay', auth, roleCheck('patient'), verifyRazorpay);
router.post('/payment-stripe', auth, roleCheck('patient'), paymentStripe);
router.post('/verify-stripe', auth, roleCheck('patient'), verifyStripe);

export default router;