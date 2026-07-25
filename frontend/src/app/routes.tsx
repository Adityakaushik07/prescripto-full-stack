import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { RoleRoute } from '../components/common/RoleRoute';
import { NotFoundPage } from '../components/common/NotFoundPage';

import { LandingPage } from '../features/landing/LandingPage';
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';
import { DoctorsPage } from '../features/doctors/DoctorsPage';
import { DoctorDetailPage } from '../features/doctors/DoctorDetailPage';
import { MyAppointmentsPage } from '../features/appointments/MyAppointmentsPage';
import { VerifyPaymentPage } from '../features/appointments/VerifyPaymentPage';
import { ProfilePage } from '../features/profile/ProfilePage';
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { ManageDoctorsPage } from '../features/admin/ManageDoctorsPage';
import { AddDoctorPage } from '../features/admin/AddDoctorPage';
import { AllAppointmentsPage } from '../features/admin/AllAppointmentsPage';
import { DoctorDashboard } from '../features/doctor/DoctorDashboard';
import { DoctorAppointmentsPage } from '../features/doctor/DoctorAppointmentsPage';
import { DoctorProfilePage } from '../features/doctor/DoctorProfilePage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes — no auth needed */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes — must be logged in */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Patient routes */}
          <Route path="home" element={<DoctorsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="doctors/:doctorId" element={<DoctorDetailPage />} />
          <Route path="my-appointments" element={<MyAppointmentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="verify" element={<VerifyPaymentPage />} />

          {/* Admin routes — role check */}
          <Route element={<RoleRoute allowedRoles={['admin']} />}>
            <Route path="dashboard/admin" element={<AdminDashboard />} />
            <Route
              path="dashboard/admin/doctors"
              element={<ManageDoctorsPage />}
            />
            <Route
              path="dashboard/admin/doctors/add"
              element={<AddDoctorPage />}
            />
            <Route
              path="dashboard/admin/appointments"
              element={<AllAppointmentsPage />}
            />
          </Route>

          {/* Doctor routes — role check */}
          <Route element={<RoleRoute allowedRoles={['doctor']} />}>
            <Route path="dashboard/doctor" element={<DoctorDashboard />} />
            <Route
              path="dashboard/doctor/appointments"
              element={<DoctorAppointmentsPage />}
            />
            <Route
              path="dashboard/doctor/profile"
              element={<DoctorProfilePage />}
            />
          </Route>
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};