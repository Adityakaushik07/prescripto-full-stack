import express from 'express';
import auth from '../../middleware/auth.js';
import roleCheck from '../../middleware/roleCheck.js';
import upload from '../../middleware/multer.js';
import {
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
} from '../../controllers/adminController.js';

const router = express.Router();

// All admin routes require admin auth
router.use(auth, roleCheck('admin'));

router.post('/add-doctor', upload.single('image'), addDoctor);
router.get('/appointments', appointmentsAdmin);
router.post('/cancel-appointment', appointmentCancel);
router.get('/all-doctors', allDoctors);
router.get('/dashboard', adminDashboard);

export default router;