import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TimePipe } from '../../pipes/time.pipe';

@Component({
  selector: 'app-reservation-info',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    TimePipe,
  ],
  templateUrl: './reservation-info-dialog.component.html',
  styleUrl: './reservation-info-dialog.component.css',
})
export class ReservationInfoDialogComponent {
  public totalDuration: any;
  public totalPrice: any;

  constructor(
    public dialogRef: MatDialogRef<ReservationInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.totalDuration = data.selectedTreatments.reduce(
      (sum: number, t: any) => sum + t.duration,
      0,
    );

    this.totalPrice = data.selectedTreatments.reduce(
      (sum: number, t: any) => sum + t.price,
      0,
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
