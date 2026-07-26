/**
 * Slot date/time helpers. The backend stores slots as plain strings —
 * `slotDate` is "D_M_YYYY" (e.g. "25_7_2026", no zero-padding) and `slotTime`
 * is "hh:mm AM/PM" (e.g. "02:00 PM"). Booking and cancellation compare these
 * strings verbatim, so every place that builds one must use these helpers.
 */

export const formatSlotDate = (date: Date): string => {
  return `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
};

export const formatSlotTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${meridiem}`;
};

/** Combines "25_7_2026" + "02:00 PM" back into a real Date. */
export const parseSlotDateTime = (
  slotDate: string,
  slotTime: string,
): Date => {
  const [day, month, year] = slotDate.split('_').map(Number);
  const [time, meridiem] = slotTime.split(' ');
  const [rawHour, minutes] = time.split(':').map(Number);
  let hour = rawHour % 12;
  if (meridiem === 'PM') hour += 12;
  return new Date(year, month - 1, day, hour, minutes);
};

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** "25_7_2026" -> "25 Jul 2026" for display on appointment cards. */
export const slotDateToDisplay = (slotDate: string): string => {
  const [day, month, year] = slotDate.split('_').map(Number);
  return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
};
