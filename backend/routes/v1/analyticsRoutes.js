import express from 'express';
import auth from '../../middleware/auth.js';
import roleCheck from '../../middleware/roleCheck.js';
import {
  getOverview,
  getAppointmentTrends,
  getRevenueByMonth,
  getSpecialityDistribution,
} from '../../controllers/analyticsController.js';

const router = express.Router();

// All analytics routes require admin auth
router.use(auth, roleCheck('admin'));

router.get('/overview', getOverview);
router.get('/appointment-trends', getAppointmentTrends);
router.get('/revenue-by-month', getRevenueByMonth);
router.get('/speciality-distribution', getSpecialityDistribution);

export default router;