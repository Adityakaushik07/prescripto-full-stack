export type Appointment = {
  _id: string;
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  userData: {
    name: string;
    image: string;
    email: string;
  };
  docData: {
    name: string;
    speciality: string;
    image: string;
    address: { line1: string; line2: string };
  };
  amount: number;
  date: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
};

export type BookingRequest = {
  docId: string;
  slotDate: string;
  slotTime: string;
};

export type CancelRequest = {
  appointmentId: string;
};

export type CompleteRequest = {
  appointmentId: string;
};