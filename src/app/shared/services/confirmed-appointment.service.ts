import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentOverview } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ConfirmedAppointmentService {
  private http = inject(HttpClient);
  private url: string = 'http://localhost:8080/appointment';

  getAllConfirmedWeekAppointments(
    date: Date,
  ): Observable<AppointmentOverview[]> {
    return this.http.get<AppointmentOverview[]>(this.url + '/confirmed', {
      params: { date: date.toISOString() },
    });
  }

  confirmAppointment(
    appointment: AppointmentOverview,
  ): Observable<AppointmentOverview> {
    return this.http.put<AppointmentOverview>(
      this.url + '/update/' + appointment.id,
      {
        ...appointment,
        state: 'CONFIRMED',
      },
    );
  }

  canceledAppointment(
    appointment: AppointmentOverview,
  ): Observable<AppointmentOverview> {
    return this.http.put<AppointmentOverview>(
      this.url + '/update/' + appointment.id,
      {
        ...appointment,
        state: 'CANCELED',
      },
    );
  }
}
