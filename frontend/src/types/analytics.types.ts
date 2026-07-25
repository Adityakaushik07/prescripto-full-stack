// Admin dashboard top-row cards
export type OverviewStats = {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalRevenue: number;
};

// Appointments booked per month — feeds the area chart
export type MonthlyData = {
  month: string;
  count: number;
};

// Revenue per month — feeds the bar chart
export type RevenueData = {
  month: string;
  amount: number;
};

// Appointment counts grouped by speciality — feeds the donut chart
export type SpecialityData = {
  name: string;
  count: number;
};