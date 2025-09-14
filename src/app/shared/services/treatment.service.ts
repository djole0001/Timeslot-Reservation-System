import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  private http = inject(HttpClient);
  private url: string = 'http://localhost:8080/treatment';

  getAllTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(this.url);
  }

  addNewTreatment(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(this.url, treatment);
  }

  deleteTreatment(treatmentId: number): Observable<any> {
    return this.http.delete(this.url + '/delete/' + treatmentId);
  }

  updateTreatment(treatmentId: number, data: Treatment): Observable<any> {
    return this.http.put(this.url + /update/ + treatmentId, data);
  }
}
