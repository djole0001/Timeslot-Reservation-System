import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private http = inject(HttpClient);
  private url: string = 'http://localhost:8080/absence';

  getAbsencesForDate(date: Date): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.url + '/get', {
      params: {
        date: date.toISOString(),
      },
    });
  }

  addNewAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(this.url + '/post', absence);
  }

  deleteAbsence(absenceId: number): Observable<any> {
    return this.http.delete(this.url + '/delete/' + absenceId);
  }

  updateAbsence(absenceId: number, data: any): Observable<any> {
    return this.http.put(this.url + /update/ + absenceId, data);
  }
}
