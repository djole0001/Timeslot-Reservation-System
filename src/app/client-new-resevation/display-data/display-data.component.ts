import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Treatment } from '../../shared/models/models';
import { DatePipe, NgClass } from '@angular/common';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimePipe } from '../../shared/pipes/time.pipe';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.css',
  imports: [
    MatIconModule,
    MatButton,
    TimePipe,
    DatePipe,
    RouterLink,
    MatAnchor,
    NgClass,
  ],
})
export class DisplayDataComponent {
  @Input() disableButtons? = false;
  @Input() selectedTime?: Date;
  @Input() totalTimeForClient?: number;
  @Input() totalPrice?: number;
  @Input() selectedTreatments?: Treatment[];
  @Input() summaryButtonIcon?: string;
  @Input() summaryButtonText?: string;
  @Input() summaryButtonHref?: string;
  @Output() removeTreatmentEmitter = new EventEmitter<number>();

  deselectTreatment(treatment: Treatment) {
    this.removeTreatmentEmitter.next(treatment.id!);
  }
}
