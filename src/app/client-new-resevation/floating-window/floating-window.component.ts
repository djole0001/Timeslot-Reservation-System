import { Component, inject } from '@angular/core';
import {
  AppState,
  selectedTreatments,
  totalPriceOfSelected,
  totalTimeOfSelected,
} from '../../store/salon.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TimePipe } from '../../shared/pipes/time.pipe';

@Component({
  selector: 'app-floating-window',
  imports: [AsyncPipe, TimePipe],
  templateUrl: './floating-window.component.html',
  styleUrl: './floating-window.component.css',
})
export class FloatingWindowComponent {
  private store: Store<AppState> = inject(Store);
  router = inject(Router);

  protected readonly selectedTreatments$ =
    this.store.select(selectedTreatments);
  protected readonly totalPrice$ = this.store.select(totalPriceOfSelected);
  protected readonly totalTimeForClient$ =
    this.store.select(totalTimeOfSelected);

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
