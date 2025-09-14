import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FreeWeekAppointments } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class FreeAppointmentService {
  private http = inject(HttpClient);
  private url: string = 'http://localhost:8080/appointment';

  getAllFreeWeekAppointments(
    selectedWeek: Date[],
    duration: number,
  ): Observable<FreeWeekAppointments> {
    const params = {
      date: selectedWeek?.map((d) => d.toISOString()),
      duration,
    };
    return this.http.get<FreeWeekAppointments>(`${this.url}/free-week`, {
      params,
    });
  }
}
