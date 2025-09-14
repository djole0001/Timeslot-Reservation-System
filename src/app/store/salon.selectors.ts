import { SalonState } from './salon.reducer';
import { createSelector } from '@ngrx/store';
import {
  getFreeAppointmentsForSelectedDate,
  getWholeWeek,
} from '../shared/utils/date.util';

export interface AppState {
  salonState: SalonState;
}

const selectSalonState = (state: AppState) => state.salonState;

const selectTreatmentOverview = createSelector(
  selectSalonState,
  (salonState) => salonState?.treatmentOverview,
);
const selectAbsenceOverview = createSelector(
  selectSalonState,
  (salonState) => salonState?.absenceOverview,
);

export const selectTreatments = createSelector(
  selectTreatmentOverview,
  (treatmentOverviewState) => treatmentOverviewState?.treatments,
);
export const selectAbsence = createSelector(
  selectAbsenceOverview,
  (absenceOverviewState) => absenceOverviewState?.absence,
);

export const selectTreatmentsIsLoading = createSelector(
  selectTreatmentOverview,
  (treatmentOverviewState) => treatmentOverviewState?.isLoading,
);
export const selectAbsenceIsLoading = createSelector(
  selectAbsenceOverview,
  (absenceOverviewState) => absenceOverviewState?.isLoading,
);

export const selectedTreatments = createSelector(
  selectSalonState,
  (salonState) => salonState?.selectedTreatments,
);

export const totalPriceOfSelected = createSelector(
  selectedTreatments,
  (selectedState) =>
    selectedState.reduce((sum, treatment) => sum + treatment.price, 0),
);
export const totalTimeOfSelected = createSelector(
  selectedTreatments,
  (selectedState) =>
    selectedState.reduce(
      (sum, treatment) => sum + treatment.durationForClient,
      0,
    ),
);

export const selectedDate = createSelector(
  selectSalonState,
  (salonState) => salonState?.selectedDate,
);
export const appointmentsForSelectedDate = createSelector(
  selectSalonState,
  (salonState) => salonState.availableAppointments,
);

export const selectedWeek = createSelector(selectedDate, (sd) =>
  getWholeWeek(sd),
);
const selectFreeAppointmentsOverview = createSelector(
  selectSalonState,
  (salonState) => salonState?.appointmentsOverview,
);
const selectPendingAppointmentsOverview = createSelector(
  selectSalonState,
  (salonState) => salonState?.pendingAppointmentsOverview,
);
const selectConfirmedAppointmentsOverview = createSelector(
  selectSalonState,
  (salonState) => salonState?.confirmedAppointmentsOverview,
);

export const selectFreeAppointments = createSelector(
  selectFreeAppointmentsOverview,
  selectedDate,
  (freeAppointmentOverview, selectedDate) =>
    getFreeAppointmentsForSelectedDate(
      selectedDate,
      freeAppointmentOverview?.freeWeekAppointments,
    ),
);

export const selectAppointmentIsLoading = createSelector(
  selectFreeAppointmentsOverview,
  (freeAppointmentOverviewState) => freeAppointmentOverviewState?.isLoading,
);
export const selectPendingAppointmentIsLoading = createSelector(
  selectPendingAppointmentsOverview,
  (pendingAppointmentsOverview) => pendingAppointmentsOverview?.isLoading,
);
export const selectConfirmedAppointmentIsLoading = createSelector(
  selectConfirmedAppointmentsOverview,
  (confirmedAppointmentsOverview) => confirmedAppointmentsOverview?.isLoading,
);

export const selectPendingAppointments = createSelector(
  selectPendingAppointmentsOverview,
  (pendingAppointmentsOverview) =>
    pendingAppointmentsOverview?.pendingAppointments,
);
export const selectConfirmedAppointments = createSelector(
  selectConfirmedAppointmentsOverview,
  (confirmedAppointmentsOverview) =>
    confirmedAppointmentsOverview?.confirmedAppointments,
);

export const selectSelectedTime = createSelector(
  selectSalonState,
  (state: SalonState) => state.selectedTime,
);
