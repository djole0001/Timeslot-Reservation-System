import { Component, inject } from '@angular/core';
import { DisplayDataComponent } from '../display-data/display-data.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  AppState,
  selectedTreatments,
  selectSelectedTime,
  totalPriceOfSelected,
  totalTimeOfSelected,
} from '../../store/salon.selectors';
import { filter, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import {
  clearSelectedTreatments,
  deselectTreatment,
} from '../../store/salon.actions';
import {
  AppointmentOverview,
  AppointmentState,
  SelectedTreatment,
  Treatment,
} from '../../shared/models/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmReservationDialogComponent } from '../confirm-reservation-dialog/confirm-reservation-dialog.component';
import { PendingAppointmentService } from '../../shared/services/pending-appointment.service';
import { ToastrService } from 'ngx-toastr';
import { ReservationInfoDialogComponent } from '../../shared/dialogs/reservation-info-dialog/reservation-info-dialog.component';

@Component({
  selector: 'app-checkout',
  imports: [
    DisplayDataComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatError,
    AsyncPipe,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private store: Store<AppState> = inject(Store);
  private toastr = inject(ToastrService);
  router = inject(Router);
  private dialog = inject(MatDialog);
  private readonly pendingAppointmentService = inject(
    PendingAppointmentService,
  );

  protected readonly totalPrice$ = this.store.select(totalPriceOfSelected);
  protected readonly totalTimeForClient$ =
    this.store.select(totalTimeOfSelected);
  protected readonly selectedTime$ = this.store.select(selectSelectedTime);

  protected readonly selectedTreatments$ = this.store
    .select(selectedTreatments)
    .pipe(
      tap((treatment) => {
        if (!treatment.length) {
          this.router.navigate(['select.treatment']);
        }
      }),
    );
  myForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    instagramNumber: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    comment: new FormControl('', {
      validators: [Validators.maxLength(800)],
    }),
  });

  submit(treatments?: Treatment[], selectedTime?: Date) {
    if (!this.myForm.valid || !treatments || !selectedTime) {
      return;
    }
    const name = this.myForm.value.name!;
    const email = this.myForm.value.email!;
    const instagramNumber = this.myForm.value.instagramNumber!;
    const comment = this.myForm.value.comment!;

    const selectedTreatments = treatments?.map((t) =>
      treatmentToSelectedTreatment(t),
    );

    const data: AppointmentOverview = {
      name,
      email,
      instagramNumber,
      comment,
      selectedTreatments,
      selectedTime,
      state: AppointmentState.PENDING,
      createdAt: new Date(),
    };

    this.dialog
      .open(ConfirmReservationDialogComponent, {
        width: '75vw',
        height: '40vh',
        disableClose: true,
        data,
      })
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.pendingAppointmentService.createAppointment(data).subscribe({
          next: (savedAppointment) => {
            console.log('Saved appointment:', savedAppointment);
            this.store.dispatch(clearSelectedTreatments());
            this.dialog.open(ReservationInfoDialogComponent, {
              width: '80vw',
              height: '70vh',
              disableClose: true,
              data: savedAppointment,
            });
          },
          error: () => {
            this.toastr.error(
              'Failed to schedule treatment. Please try again.',
              '',
              {
                positionClass: 'toast-top-right',
                timeOut: 3000,
              },
            );
          },
        });
      });
  }

  removeTreatment(treatmentId: number) {
    this.store.dispatch(deselectTreatment({ treatmentId }));
  }
}

function treatmentToSelectedTreatment(t: Treatment): SelectedTreatment {
  return {
    name: t.name,
    price: t.price,
    duration: t.durationForWorker,
    treatment: t,
  };
}
