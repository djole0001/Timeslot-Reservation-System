import { Routes } from '@angular/router';
import { TreatmentOverviewComponent } from './treatment/overview/treatment-overview.component';
import { SelectTreatmentComponent } from './client-new-resevation/select-treatment/select-treatment.component';
import { SelectAppointmentComponent } from './client-new-resevation/select-appointment/select-appointment.component';
import { CheckoutComponent } from './client-new-resevation/checkout/checkout.component';
import { PendingAppointmentsComponent } from './pending-appointments/pending-appointments.component';
import { EventsOverviewComponent } from './events-overview/events-overview.component';

export const routes: Routes = [
  {
    path: 'events-overview',
    component: EventsOverviewComponent,
  },
  {
    path: 'pending-appointments',
    component: PendingAppointmentsComponent,
  },
  {
    path: 'select-treatment',
    component: SelectTreatmentComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'select-appointment',
    component: SelectAppointmentComponent,
  },
  {
    path: 'treatment-overview',
    component: TreatmentOverviewComponent,
  },
  {
    path: '**',
    redirectTo: 'select-treatment',
  },
];
