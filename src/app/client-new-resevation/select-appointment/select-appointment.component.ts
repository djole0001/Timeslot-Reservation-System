import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectAppointmentIsLoading,
  selectedDate,
  selectedTreatments,
  selectedWeek,
  selectFreeAppointments,
  selectSelectedTime,
  totalPriceOfSelected,
  totalTimeOfSelected,
} from '../../store/salon.selectors';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  deselectTreatment,
  loadFreeAppointments,
  selectDate,
  selectNextWeek,
  selectPrevWeek,
  selectTime,
} from '../../store/salon.actions';
import { Router } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DisplayDataComponent } from '../display-data/display-data.component';

@Component({
  selector: 'app-select-appointment',
  imports: [AsyncPipe, CalendarComponent, DisplayDataComponent, DatePipe],
  templateUrl: './select-appointment.component.html',
  styleUrl: './select-appointment.component.css',
})
export class SelectAppointmentComponent {
  private store: Store<AppState> = inject(Store);
  router = inject(Router);

  protected readonly totalPrice$ = this.store.select(totalPriceOfSelected);
  protected readonly totalTimeForClient$ =
    this.store.select(totalTimeOfSelected);
  protected readonly selectedTime$ = this.store.select(selectSelectedTime);

  protected readonly selectedTreatments$ = this.store
    .select(selectedTreatments)
    .pipe(
      tap((treatment) => {
        if (!treatment.length) {
          this.router.navigate(['select.treatment']);
        }
      }),
    );
  protected readonly selectedDate$ = this.store.select(selectedDate);
  protected readonly selectedWeek$ = this.store.select(selectedWeek);
  protected readonly freeAppointments$ = this.store
    .select(selectFreeAppointments)
    .pipe(tap((a) => console.log(a)));
  protected readonly isLoadingFreeAppointments$ = this.store.select(
    selectAppointmentIsLoading,
  );

  constructor() {
    this.selectedWeek$
      .pipe(
        takeUntilDestroyed(),
      )
      .subscribe((selectedWeek) =>
        this.store.dispatch(loadFreeAppointments({ week: selectedWeek })),
      );
  }

  selectDate(date: Date) {
    this.store.dispatch(selectDate({ date }));
  }

  selectNextWeek() {
    this.store.dispatch(selectNextWeek());
  }

  selectPrevWeek() {
    this.store.dispatch(selectPrevWeek());
  }

  removeTreatment(treatmentId: number) {
    this.store.dispatch(deselectTreatment({ treatmentId }));
  }

  selectTime(time: Date) {
    this.store.dispatch(selectTime({ time }));
    console.log(time);
  }
}
