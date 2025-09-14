import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentOverview } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingAppointmentService {
  private http = inject(HttpClient);
  private url: string = 'http://localhost:8080/appointment';

  getAllPendingAppointments(): Observable<AppointmentOverview[]> {
    return this.http.get<AppointmentOverview[]>(this.url + '/pending');
  }

  createAppointment(appointment: AppointmentOverview): Observable<any> {
    return this.http.post(`${this.url}/pending-appointments`, appointment);
  }
}
