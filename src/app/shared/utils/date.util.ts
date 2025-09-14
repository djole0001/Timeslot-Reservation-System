import {
  AppointmentOverview,
  FreeAppointment,
  FreeWeekAppointments,
} from '../models/models';

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMinutes(date: Date, minutes: number) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

function getMonday(date: Date): Date {
  const currentDay = date.getDay();
  const diff = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = addDays(date, diff);
  return new Date(monday.toDateString());
}

export function getWholeWeek(date?: Date): Date[] {
  if (!date) {
    return [];
  }
  const monday = getMonday(date);
  const week: Date[] = [];
  for (let i = 0; i < 7; i++) {
    week.push(addDays(monday, i));
  }

  return week;
}

export function getFreeAppointmentsForSelectedDate(
  selectedDate: Date | null,
  freeWeekAppointments?: FreeWeekAppointments,
): FreeAppointment[] {
  if (!selectedDate || !freeWeekAppointments) return [];

  const selectedDateKey = formatDateToString(selectedDate);

  const matchingKey = Object.keys(freeWeekAppointments.week).find((key) =>
    key.includes(selectedDateKey),
  );

  return matchingKey ? (freeWeekAppointments.week[matchingKey] ?? []) : [];
}

function formatDateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function getAppointmentEndTime(value: AppointmentOverview): Date {
  if (!value.selectedTreatments?.length) {
    return value.selectedTime;
  }
  let sum = 0;
  for (const val of value.selectedTreatments) {
    sum += val.duration;
  }
  return addMinutes(value.selectedTime, sum);
}

export function getDateWithoutTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
