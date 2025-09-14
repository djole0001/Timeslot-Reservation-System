import { Component, inject } from '@angular/core';
import { CalendarComponent } from '../client-new-resevation/calendar/calendar.component';
import { AsyncPipe } from '@angular/common';
import {
  AppState,
  selectAbsence,
  selectAbsenceIsLoading,
  selectConfirmedAppointmentIsLoading,
  selectConfirmedAppointments,
  selectedDate,
  selectedWeek,
} from '../store/salon.selectors';
import { Store } from '@ngrx/store';
import {
  addNewAbsence,
  loadAbsence,
  loadConfirmedAppointments,
  selectDate,
  selectNextWeek,
  selectPrevWeek,
} from '../store/salon.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import {
  Absence,
  AppointmentOverview,
  DynamicContentItem,
  DynamicItem,
} from '../shared/models/models';
import { getAppointmentEndTime } from '../shared/utils/date.util';
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { DIALOG_ANIMATION_TIME } from '../shared/constants';
import { AbsenceDialogComponent } from '../absence-dialog/absence-dialog.component';

@Component({
  selector: 'app-events-overview',
  imports: [
    CalendarComponent,
    AsyncPipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule,
    MatButton,
    MatDialogActions,
  ],
  templateUrl: './events-overview.component.html',
  styleUrl: './events-overview.component.css',
})
export class EventsOverviewComponent {
  private store: Store<AppState> = inject(Store);
  private dialog = inject(MatDialog);

  protected readonly selectedDate$ = this.store.select(selectedDate);
  protected readonly selectedWeek$ = this.store.select(selectedWeek);

  protected readonly absenceSForWholeDay$ = this.store
    .select(selectAbsence)
    .pipe(
      map((absences: Absence[]) => {
        const wholeDayAbsence = absences.filter((abs) => abs.wholeDay);
        return absenceWholeDayToDynamicItem(wholeDayAbsence);
      }),
    );

  protected readonly absenceSForPartDay$ = this.store
    .select(selectAbsence)
    .pipe(
      map((absences: Absence[]) => absences.filter((abs) => !abs.wholeDay)),
    );

  protected readonly confirmedAppointment$ = this.store.select(
    selectConfirmedAppointments,
  );

  protected readonly isLoading$ = combineLatest([
    this.store.select(selectConfirmedAppointmentIsLoading),
    this.store.select(selectAbsenceIsLoading),
  ]).pipe(map(([caIsLoading, abIsLoading]) => caIsLoading || abIsLoading));

  protected combinedAppointmentAndAbsencePartDay$ = combineLatest([
    this.absenceSForPartDay$,
    this.confirmedAppointment$,
  ]).pipe(
    map(([absences, appointments]) => {
      const absencePartDayItems = absenceToDynamicItem(absences);
      const appointmentItems = appointmentsToDynamicItem(appointments ?? []);
      const combinedArray = [...absencePartDayItems, ...appointmentItems].sort(
        (a, b) => {
          if (!a.date || !b.date) {
            return -1;
          } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }
        },
      );
      console.log(combinedArray);
      return combinedArray;
    }),
  );

  constructor() {
    this.selectedDate$
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged((a, b) => a?.getTime() === b?.getTime()),
      )
      .subscribe((selectedDate) => {
        this.store.dispatch(loadConfirmedAppointments({ date: selectedDate }));
        this.store.dispatch(loadAbsence({ date: selectedDate }));
      });
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

  openDialog() {
    let dialog = this.dialog.open(AbsenceDialogComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: DIALOG_ANIMATION_TIME,
      exitAnimationDuration: DIALOG_ANIMATION_TIME,
      disableClose: false,
      data: {
        title: 'Create absence',
        absence: undefined,
      },
    });
    dialog
      .afterClosed()
      .pipe(filter((result: Absence) => !!result))
      .subscribe((absence) => this.store.dispatch(addNewAbsence({ absence })));
  }
}

function appointmentsToDynamicItem(
  appointments: AppointmentOverview[] | undefined,
): DynamicItem[] {
  if (!appointments?.length) {
    return [];
  }
  return appointments.map((a) => ({
    header: getHeaderForAppointment(a),
    items: getContentItemsForAppointment(a),
    date: a.selectedTime,
    type: 'appointment',
  }));
}

function absenceToDynamicItem(absence: Absence[] | undefined): DynamicItem[] {
  if (!absence?.length) {
    return [];
  }
  return absence.map((a) => ({
    header: getHeaderForAbsence(a),
    items: [],
    date: a.fromDate,
  }));
}

function absenceWholeDayToDynamicItem(
  absence: Absence[] | undefined,
): DynamicItem[] {
  if (!absence?.length) {
    return [];
  }
  return absence.map((a) => ({
    header: getHeaderForAbsenceWholeDay(a),
    items: [],
    date: a.fromDate,
  }));
}

function getHeaderForAppointment(
  appointment: AppointmentOverview,
): DynamicContentItem {
  let sum = 0;
  for (const val of appointment.selectedTreatments) {
    sum += val.price;
  }
  if (!appointment.selectedTime) {
    return {
      content: '',
      rightContent: `€${sum}`,
    };
  }

  const selectedTime = new Date(appointment.selectedTime);

  const startTimeString = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`;
  const endTime = getAppointmentEndTime(appointment);
  const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

  return {
    content: `${startTimeString}-${endTimeString} ${appointment.name}`,
    rightContent: `€${sum}`,
  };
}

function getHeaderForAbsence(absence: Absence): DynamicContentItem {
  const fromDate = new Date(absence.fromDate!);
  const fromDateAbsence = `${fromDate.getHours().toString().padStart(2, '0')}:${fromDate.getMinutes().toString().padStart(2, '0')}`;
  const endTime = new Date(absence.toDate!);
  const toDateAbsence = `${endTime?.getHours().toString().padStart(2, '0')}:${endTime?.getMinutes().toString().padStart(2, '0')}`;
  return {
    content: `Absence: ${fromDateAbsence}-${toDateAbsence} `,
    rightContent: `${absence.comment}`,
  };
}

function getHeaderForAbsenceWholeDay(absence: Absence): DynamicContentItem {
  const fromDate = new Date(absence.fromDate!);
  const fromDateAbsence = fromDate
    ? `${fromDate.getDate().toString().padStart(2, '0')}.${(fromDate.getMonth() + 1).toString().padStart(2, '0')}.${fromDate.getFullYear()}`
    : '';
  const toDate = new Date(absence.toDate!);
  const toDateAbsence = toDate
    ? `${toDate.getDate().toString().padStart(2, '0')}.${(toDate.getMonth() + 1).toString().padStart(2, '0')}.${toDate.getFullYear()}`
    : '';
  return {
    content: `Absence: ${fromDateAbsence}-${toDateAbsence} `,
    rightContent: `${absence.comment}`,
  };
}

function getContentItemsForAppointment(
  appointment: AppointmentOverview,
): DynamicContentItem[] {
  const items: DynamicContentItem[] = [];
  items.push({
    content: appointment.email,
    rightContent: appointment.instagramNumber,
  });
  items.push({
    content: appointment.comment,
  });
  appointment.selectedTreatments.forEach((t) =>
    items.push({
      content: t.name,
      rightContent: `€${t.price}`,
    }),
  );

  return items;
}
