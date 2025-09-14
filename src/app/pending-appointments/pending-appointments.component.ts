import { Component, inject } from '@angular/core';
import {
  AppState,
  selectPendingAppointmentIsLoading,
  selectPendingAppointments,
} from '../store/salon.selectors';
import { Store } from '@ngrx/store';
import {
  acceptPendingAppointment,
  cancelPendingAppointment,
  loadPendingAppointments,
} from '../store/salon.actions';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { TimePipe } from '../shared/pipes/time.pipe';
import { SumAppointmentPricePipe } from '../shared/pipes/sum-appointment-price.pipe';
import { GetAppointmentEndTimePipe } from '../shared/pipes/get-appointment-end-time.pipe';
import { AppointmentOverview } from '../shared/models/models';

@Component({
  selector: 'app-pending-appointments',
  imports: [
    AsyncPipe,
    DatePipe,
    MatChip,
    MatChipSet,
    TimePipe,
    SumAppointmentPricePipe,
    GetAppointmentEndTimePipe,
  ],
  templateUrl: './pending-appointments.component.html',
  styleUrl: './pending-appointments.component.css',
})
export class PendingAppointmentsComponent {
  private store: Store<AppState> = inject(Store);

  protected readonly pendingAppointments$ = this.store.select(
    selectPendingAppointments,
  );
  protected readonly pendingAppointmentsIsLoading$ = this.store.select(
    selectPendingAppointmentIsLoading,
  );

  constructor() {
    this.store.dispatch(loadPendingAppointments());
  }

  confirmedPendingAppointment(appointment: AppointmentOverview) {
    this.store.dispatch(acceptPendingAppointment({ appointment }));
  }

  cancelledPendingAppointment(appointment: AppointmentOverview) {
    this.store.dispatch(cancelPendingAppointment({ appointment }));
  }
}
