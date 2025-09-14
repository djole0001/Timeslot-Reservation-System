import { createAction, props } from '@ngrx/store';
import {
  Absence,
  AppointmentOverview,
  FreeWeekAppointments,
  Treatment,
} from '../shared/models/models';

export const loadTreatments = createAction('[Treatment] Load Treatments');
export const loadAbsence = createAction(
  '[Absence] Load Absence',
  props<{ date: Date }>(),
);

export const treatmentsLoadedSuccessfully = createAction(
  '[Treatment] Treatments loaded successfully',
  props<{ treatments: Treatment[] }>(),
);
export const absenceLoadedSuccessfully = createAction(
  '[Absence] Absence loaded successfully',
  props<{ absence: Absence[] }>(),
);

export const treatmentsLoadFailed = createAction(
  '[Treatment] Treatments load failed',
);
export const absenceLoadFailed = createAction('[Absence] Absence load failed');

export const addNewTreatment = createAction(
  '[Treatment] Add new treatment',
  props<{ treatment: Treatment }>(),
);
export const updateTreatment = createAction(
  '[Treatment] Update treatment',
  props<{ treatment: any }>(),
);
export const addNewAbsence = createAction(
  '[Absence] Add new absence',
  props<{ absence: Absence }>(),
);

export const deleteTreatment = createAction(
  '[Treatment] Add delete treatment',
  props<{ treatmentId: number }>(),
);
export const deleteAbsence = createAction(
  '[Absence] Add delete absence',
  props<{ absenceId: number }>(),
);

export const selectTreatment = createAction(
  '[Treatment] Select treatment',
  props<{ treatment: Treatment }>(),
);
export const selectTime = createAction(
  '[Treatment] Select time',
  props<{ time: Date }>(),
);

export const deselectTreatment = createAction(
  '[Treatment] Remove treatment from selected',
  props<{ treatmentId: number }>(),
);
export const selectDate = createAction(
  '[Date] Select date',
  props<{ date: Date }>(),
);
export const selectNextWeek = createAction('[Date] Select week');
export const selectPrevWeek = createAction('[Date] Select pre week');
export const loadFreeAppointments = createAction(
  '[Appointments] Load Free Appointments',
  props<{ week: Date[] }>(),
);
export const loadFreeAppointmentsSuccessfully = createAction(
  '[Appointments] Load Free Appointments Successfully',
  props<{ freeAppointments: FreeWeekAppointments }>(),
);

export const loadFreeAppointmentsFailed = createAction(
  '[Appointments] Load Free Appointments Failed',
);
export const loadPendingAppointments = createAction(
  '[Appointments] Load Pending Appointments',
);
export const loadPendingAppointmentsSuccessfully = createAction(
  '[Appointments] Load Pending Appointments Successfully',
  props<{ pendingAppointments: AppointmentOverview[] }>(),
);
export const acceptPendingAppointment = createAction(
  '[Appointments] Accept Appointment',
  props<{ appointment: AppointmentOverview }>(),
);
export const cancelPendingAppointment = createAction(
  '[Appointments] Cancel Appointment',
  props<{ appointment: AppointmentOverview }>(),
);
export const loadPendingAppointmentsFailed = createAction(
  '[Appointments] Load Confirmed Appointments Failed',
);
export const loadConfirmedAppointments = createAction(
  '[Appointments] Load Confirmed Appointments',
  props<{ date: Date }>(),
);
export const loadConfirmedAppointmentsSuccessfully = createAction(
  '[Appointments] Load Confirmed Appointments Successfully',
  props<{ confirmedAppointments: AppointmentOverview[] }>(),
);
export const loadConfirmedAppointmentsFailed = createAction(
  '[Date] Load Confirmed Appointments Failed',
);
export const clearSelectedTreatments = createAction(
  '[Treatment] Clear Selected Treatments',
);
