// Shape of the patient profile returned by GET /appointments/profile
// (the backend sends it as `userData` — see profileService)
export type PatientProfile = {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
  };
  gender: string;
  dob: string;
};
