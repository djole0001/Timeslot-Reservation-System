import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { AppointmentOverview } from '../../shared/models/models';

@Component({
  selector: 'app-confirm-reservation-dialog',
  imports: [MatButton, MatDialogClose, DatePipe],
  templateUrl: './confirm-reservation-dialog.component.html',
  styleUrl: './confirm-reservation-dialog.component.css',
})
export class ConfirmReservationDialogComponent {
  public data: AppointmentOverview = inject(MAT_DIALOG_DATA);
}
