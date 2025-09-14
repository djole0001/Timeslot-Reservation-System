import { createReducer, on } from '@ngrx/store';
import {
  absenceLoadedSuccessfully,
  absenceLoadFailed,
  clearSelectedTreatments,
  deselectTreatment,
  loadAbsence,
  loadConfirmedAppointments,
  loadConfirmedAppointmentsFailed,
  loadConfirmedAppointmentsSuccessfully,
  loadFreeAppointments,
  loadFreeAppointmentsFailed,
  loadFreeAppointmentsSuccessfully,
  loadPendingAppointments,
  loadPendingAppointmentsFailed,
  loadPendingAppointmentsSuccessfully,
  loadTreatments,
  selectDate,
  selectNextWeek,
  selectPrevWeek,
  selectTime,
  selectTreatment,
  treatmentsLoadedSuccessfully,
  treatmentsLoadFailed,
} from './salon.actions';
import { produce } from 'immer';
import {
  Absence,
  AppointmentOverview,
  FreeWeekAppointments,
  Treatment,
} from '../shared/models/models';
import { addDays, getDateWithoutTime } from '../shared/utils/date.util';

export interface SalonState {
  treatmentOverview: {
    treatments: Treatment[];
    isLoading: boolean;
  };
  absenceOverview: {
    absence: Absence[];
    isLoading: boolean;
  };
  selectedTreatments: Treatment[];
  selectedDate: Date;
  availableAppointments?: Map<string, string[]>;
  isAvailableAppointmentsLoading: boolean;
  appointmentsOverview: {
    freeWeekAppointments?: FreeWeekAppointments;
    isLoading: boolean;
  };
  pendingAppointmentsOverview: {
    pendingAppointments?: AppointmentOverview[];
    isLoading: boolean;
  };
  confirmedAppointmentsOverview: {
    confirmedAppointments?: AppointmentOverview[];
    isLoading: boolean;
  };
  selectedTime?: Date;
}

const initialState: SalonState = {
  treatmentOverview: {
    treatments: [],
    isLoading: false,
  },
  absenceOverview: {
    absence: [],
    isLoading: false,
  },
  selectedTreatments: [],
  selectedDate: getDateWithoutTime(new Date()),
  availableAppointments: undefined,
  isAvailableAppointmentsLoading: false,
  appointmentsOverview: {
    freeWeekAppointments: undefined,
    isLoading: true,
  },
  pendingAppointmentsOverview: {
    pendingAppointments: undefined,
    isLoading: true,
  },
  confirmedAppointmentsOverview: {
    confirmedAppointments: undefined,
    isLoading: true,
  },

  selectedTime: undefined,
};

export const salonReducer = createReducer(
  initialState,
  on(loadTreatments, (state) =>
    produce(state, (draft) => {
      draft.treatmentOverview.isLoading = true;
    }),
  ),
  on(loadAbsence, (state) =>
    produce(state, (draft) => {
      draft.treatmentOverview.isLoading = true;
    }),
  ),
  on(treatmentsLoadedSuccessfully, (state, action) =>
    produce(state, (draft) => {
      draft.treatmentOverview.isLoading = false;
      draft.treatmentOverview.treatments = action.treatments;
    }),
  ),
  on(absenceLoadedSuccessfully, (state, action) =>
    produce(state, (draft) => {
      draft.absenceOverview.isLoading = false;
      draft.absenceOverview.absence = action.absence;
    }),
  ),
  on(treatmentsLoadFailed, (state) =>
    produce(state, (draft) => {
      draft.treatmentOverview.isLoading = false;
      draft.treatmentOverview.treatments = [];
    }),
  ),
  on(absenceLoadFailed, (state) =>
    produce(state, (draft) => {
      draft.absenceOverview.isLoading = false;
      draft.absenceOverview.absence = [];
    }),
  ),
  on(selectTreatment, (state, action) =>
    produce(state, (draft) => {
      draft.selectedTreatments = [
        ...draft.selectedTreatments,
        action.treatment,
      ];
    }),
  ),
  on(deselectTreatment, (state, action) =>
    produce(state, (draft) => {
      draft.selectedTreatments = draft.selectedTreatments.filter(
        (st) => st.id !== action.treatmentId,
      );
    }),
  ),
  on(selectDate, (state, action) =>
    produce(state, (draft) => {
      draft.selectedDate = action.date;
    }),
  ),
  on(selectTime, (state, action) =>
    produce(state, (draft) => {
      draft.selectedTime = action.time;
    }),
  ),
  on(selectPrevWeek, (state) =>
    produce(state, (draft) => {
      draft.selectedDate = addDays(new Date(draft.selectedDate), -7);
    }),
  ),
  on(selectNextWeek, (state) =>
    produce(state, (draft) => {
      draft.selectedDate = addDays(new Date(draft.selectedDate), 7);
    }),
  ),

  on(loadFreeAppointments, (state) =>
    produce(state, (draft) => {
      draft.appointmentsOverview.isLoading = true;
    }),
  ),
  on(loadFreeAppointmentsSuccessfully, (state, action) =>
    produce(state, (draft) => {
      draft.appointmentsOverview.isLoading = false;
      draft.appointmentsOverview.freeWeekAppointments = action.freeAppointments;
    }),
  ),
  on(loadFreeAppointmentsFailed, (state) =>
    produce(state, (draft) => {
      draft.appointmentsOverview.isLoading = false;
      draft.appointmentsOverview.freeWeekAppointments = undefined;
    }),
  ),
  on(loadPendingAppointments, (state) =>
    produce(state, (draft) => {
      draft.pendingAppointmentsOverview.isLoading = true;
    }),
  ),
  on(loadPendingAppointmentsSuccessfully, (state, action) =>
    produce(state, (draft) => {
      draft.pendingAppointmentsOverview.isLoading = false;
      draft.pendingAppointmentsOverview.pendingAppointments =
        action.pendingAppointments;
    }),
  ),
  on(loadPendingAppointmentsFailed, (state) =>
    produce(state, (draft) => {
      draft.pendingAppointmentsOverview.isLoading = false;
      draft.pendingAppointmentsOverview.pendingAppointments = undefined;
    }),
  ),
  on(loadConfirmedAppointments, (state) =>
    produce(state, (draft) => {
      draft.confirmedAppointmentsOverview.isLoading = true;
    }),
  ),
  on(loadConfirmedAppointmentsSuccessfully, (state, action) =>
    produce(state, (draft) => {
      draft.confirmedAppointmentsOverview.isLoading = false;
      draft.confirmedAppointmentsOverview.confirmedAppointments =
        action.confirmedAppointments;
    }),
  ),
  on(loadConfirmedAppointmentsFailed, (state) =>
    produce(state, (draft) => {
      draft.confirmedAppointmentsOverview.isLoading = false;
      draft.confirmedAppointmentsOverview.confirmedAppointments = undefined;
    }),
  ),
  on(clearSelectedTreatments, (state) => ({
    ...state,
    selectedTreatments: [],
  })),
);
