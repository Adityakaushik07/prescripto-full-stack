import express from 'express';
import auth from '../../middleware/auth.js';
import roleCheck from '../../middleware/roleCheck.js';
import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from '../../controllers/doctorController.js';

const router = express.Router();

// Public: list all doctors (used by patients browsing the directory)
router.get('/list', doctorList);

// Doctor-only routes
router.get('/appointments', auth, roleCheck('doctor'), appointmentsDoctor);
router.post('/cancel-appointment', auth, roleCheck('doctor'), appointmentCancel);
router.post('/complete-appointment', auth, roleCheck('doctor'), appointmentComplete);
router.get('/dashboard', auth, roleCheck('doctor'), doctorDashboard);
router.get('/profile', auth, roleCheck('doctor'), doctorProfile);
router.post('/update-profile', auth, roleCheck('doctor'), updateDoctorProfile);

router.post('/change-availability', auth, roleCheck('admin', 'doctor'), changeAvailablity);

export default router;