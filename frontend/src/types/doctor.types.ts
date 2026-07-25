export type Doctor = {
  _id: string;
  name: string;
  // Only included in admin responses, so the public list never exposes it
  email?: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  available: boolean;
  image: string;
  address: {
    line1: string;
    line2: string;
  };
  slots_booked: Record<string, string[]>;
};

// Drives the DoctorsPage search + speciality filter controls
export type DoctorFilters = {
  search: string;
  speciality: string;
};