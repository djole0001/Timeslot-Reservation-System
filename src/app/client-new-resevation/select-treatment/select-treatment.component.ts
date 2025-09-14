import { Component, inject } from '@angular/core';
import {
  AppState,
  selectedTreatments,
  selectTreatments,
} from '../../store/salon.selectors';
import { Store } from '@ngrx/store';
import {
  deselectTreatment,
  loadTreatments,
  selectTreatment,
} from '../../store/salon.actions';
import { AsyncPipe } from '@angular/common';
import { FloatingWindowComponent } from '../floating-window/floating-window.component';
import { Treatment, TreatmentWithSelected } from '../../shared/models/models';
import { combineLatest, map, Observable } from 'rxjs';
import { TimePipe } from '../../shared/pipes/time.pipe';

@Component({
  selector: 'app-select-treatment',
  imports: [AsyncPipe, FloatingWindowComponent, TimePipe],
  templateUrl: './select-treatment.component.html',
  styleUrl: './select-treatment.component.css',
})
export class SelectTreatmentComponent {
  private store: Store<AppState> = inject(Store);

  protected readonly treatments$: Observable<TreatmentWithSelected[]> =
    combineLatest([
      this.store.select(selectTreatments),
      this.store.select(selectedTreatments),
    ]).pipe(
      map(([treatments, selectedTreatments]) =>
        treatments.map((t) => ({
          ...t,
          isSelected: selectedTreatments.some((st) => st.id === t.id),
        })),
      ),
    );

  constructor() {
    this.store.dispatch(loadTreatments());
  }

  selectTreatment(treatment: Treatment) {
    this.store.dispatch(selectTreatment({ treatment }));
  }

  deselectTreatment(treatment: Treatment) {
    this.store.dispatch(deselectTreatment({ treatmentId: treatment.id! }));
  }
}
