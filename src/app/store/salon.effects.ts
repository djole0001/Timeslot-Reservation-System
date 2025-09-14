import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  absenceLoadedSuccessfully,
  acceptPendingAppointment,
  addNewAbsence,
  addNewTreatment,
  cancelPendingAppointment,
  deleteTreatment,
  deselectTreatment,
  loadAbsence,
  loadConfirmedAppointments,
  loadConfirmedAppointmentsSuccessfully,
  loadFreeAppointments,
  loadFreeAppointmentsSuccessfully,
  loadPendingAppointments,
  loadPendingAppointmentsSuccessfully,
  loadTreatments,
  treatmentsLoadedSuccessfully,
  updateTreatment,
} from './salon.actions';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectedDate,
  selectedTreatments,
  selectedWeek,
} from './salon.selectors';
import { TreatmentService } from '../shared/services/treatment.service';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { FreeAppointmentService } from '../shared/services/free-appointment.service';
import { PendingAppointmentService } from '../shared/services/pending-appointment.service';
import { ConfirmedAppointmentService } from '../shared/services/confirmed-appointment.service';
import { AbsenceService } from '../shared/services/absence.service';

@Injectable()
export class SalonEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<AppState>);
  private readonly treatmentService = inject(TreatmentService);
  private readonly absenceService = inject(AbsenceService);
  private readonly appointmentService = inject(FreeAppointmentService);
  private readonly pendingAppointmentService = inject(
    PendingAppointmentService,
  );
  private readonly confirmedAppointmentService = inject(
    ConfirmedAppointmentService,
  );

  readonly loadTreatments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreatments),
      switchMap(() => this.treatmentService.getAllTreatments()),
      map((treatments) => treatmentsLoadedSuccessfully({ treatments })),
    ),
  );

  readonly addNewTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewTreatment),
      switchMap((action) =>
        this.treatmentService.addNewTreatment(action.treatment),
      ),
      map((treatments) => loadTreatments()),
    ),
  );
  readonly addNewAbsence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewAbsence),
      withLatestFrom(this.store.select(selectedDate)),
      switchMap(([action, date]) =>
        this.absenceService
          .addNewAbsence(action.absence)
          .pipe(map(() => loadAbsence({ date: date }))),
      ),
    ),
  );
  readonly updateTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTreatment),
      switchMap((action) =>
        this.treatmentService.updateTreatment(
          action.treatment.id,
          action.treatment,
        ),
      ),
      map((treatments) => loadTreatments()),
    ),
  );
  readonly deleteTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTreatment),
      switchMap((action) =>
        this.treatmentService.deleteTreatment(action.treatmentId),
      ),
      map(() => loadTreatments()),
    ),
  );
  readonly loadFreeAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFreeAppointments),
      withLatestFrom(this.store.select(selectedTreatments)),
      switchMap(([action, selectedTreatments]) => {
        const totalDuration = selectedTreatments.reduce(
          (sum, t) => sum + t.durationForWorker,
          0,
        );
        return this.appointmentService.getAllFreeWeekAppointments(
          action.week,
          totalDuration,
        );
      }),
      map((freeAppointments) =>
        loadFreeAppointmentsSuccessfully({ freeAppointments }),
      ),
    ),
  );
  readonly loadPendingAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPendingAppointments),
      switchMap(() =>
        this.pendingAppointmentService.getAllPendingAppointments(),
      ),
      map((pendingAppointments) =>
        loadPendingAppointmentsSuccessfully({ pendingAppointments }),
      ),
    ),
  );
  readonly loadConfirmedAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConfirmedAppointments),
      switchMap((action) =>
        this.confirmedAppointmentService.getAllConfirmedWeekAppointments(
          action.date,
        ),
      ),
      map((confirmedAppointments) =>
        loadConfirmedAppointmentsSuccessfully({ confirmedAppointments }),
      ),
    ),
  );

  readonly loadAbsence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAbsence),
      switchMap((action) =>
        this.absenceService.getAbsencesForDate(action.date),
      ),
      map((absence) => absenceLoadedSuccessfully({ absence })),
    ),
  );
  readonly acceptAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptPendingAppointment),
      switchMap((action) =>
        this.confirmedAppointmentService
          .confirmAppointment(action.appointment)
          .pipe(map(() => loadPendingAppointments())),
      ),
    ),
  );
  readonly canceledAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelPendingAppointment),
      switchMap((action) =>
        this.confirmedAppointmentService
          .canceledAppointment(action.appointment)
          .pipe(map(() => loadPendingAppointments())),
      ),
    ),
  );
  deselectTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deselectTreatment),
      withLatestFrom(
        this.store.select(selectedTreatments),
        this.store.select(selectedWeek),
      ),
      switchMap(([_, selectedTreatments, week]) => {
        const totalDuration = selectedTreatments.reduce(
          (sum, t) => sum + t.durationForClient,
          0,
        );

        return this.appointmentService
          .getAllFreeWeekAppointments(week, totalDuration)
          .pipe(
            map((freeAppointments) =>
              loadFreeAppointmentsSuccessfully({ freeAppointments }),
            ),
          );
      }),
    ),
  );
}
