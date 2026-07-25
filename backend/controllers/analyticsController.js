import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';

// GET /api/v1/analytics/overview
// Counts of doctors, patients, appointments and total paid revenue.
export const getOverview = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.countDocuments();
    const totalPatients = await userModel.countDocuments();
    const totalAppointments = await appointmentModel.countDocuments();

    const paidAppointments = await appointmentModel.find({ payment: true });
    const totalRevenue = paidAppointments.reduce((sum, apt) => sum + apt.amount, 0);

    res.json({
      success: true,
      data: { totalDoctors, totalPatients, totalAppointments, totalRevenue },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/analytics/appointment-trends
// Appointment counts grouped by month for the last 6 months.
export const getAppointmentTrends = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const appointments = await appointmentModel.find({
      date: { $gte: sixMonthsAgo.getTime() },
    });

    // Group by month
    const monthlyData = {};
    appointments.forEach((apt) => {
      const date = new Date(apt.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[key] = (monthlyData[key] || 0) + 1;
    });

    // Convert to sorted array
    const trends = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));

    res.json({ success: true, data: trends });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/analytics/revenue-by-month
// Paid revenue grouped by month for the last 6 months.
export const getRevenueByMonth = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const paidAppointments = await appointmentModel.find({
      payment: true,
      date: { $gte: sixMonthsAgo.getTime() },
    });

    const monthlyRevenue = {};
    paidAppointments.forEach((apt) => {
      const date = new Date(apt.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyRevenue[key] = (monthlyRevenue[key] || 0) + apt.amount;
    });

    const revenue = Object.entries(monthlyRevenue)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount }));

    res.json({ success: true, data: revenue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/analytics/speciality-distribution
// Appointment counts grouped by doctor speciality.
export const getSpecialityDistribution = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    const distribution = {};

    appointments.forEach((apt) => {
      const speciality = apt.docData?.speciality || 'Unknown';
      distribution[speciality] = (distribution[speciality] || 0) + 1;
    });

    const result = Object.entries(distribution)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};