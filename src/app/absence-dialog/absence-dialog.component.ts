import { Component, inject } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { Absence } from '../shared/models/models';
import {
  MatTimepicker,
  MatTimepickerInput,
  MatTimepickerModule,
  MatTimepickerToggle,
} from '@angular/material/timepicker';

@Component({
  selector: 'app-absence-dialog',
  imports: [
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    MatFormField,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatTimepickerInput,
    MatTimepickerToggle,
    MatTimepicker,
    MatTimepickerModule,
  ],
  templateUrl: './absence-dialog.component.html',
  styleUrl: './absence-dialog.component.css',
})
export class AbsenceDialogComponent {
  x?: string;
  absence: string[] = ['All day', 'Part day'];
  public data: { title: string | undefined; absence: Absence } =
    inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<AbsenceDialogComponent>);

  myFormAllDay = new FormGroup({
    fromDate: new FormControl(null, {
      validators: [Validators.required],
    }),
    toDate: new FormControl(null, {
      validators: [Validators.required],
    }),
    comment: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
  myFormPartDay = new FormGroup({
    date: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
    fromTime: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
    toTime: new FormControl<Date | null>(null, {
      validators: [Validators.required],
    }),
    comment: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  onSave() {
    if (!this.myFormAllDay.valid) {
      return;
    }
    const fromDate = this.myFormAllDay.value.fromDate!;
    const toDate = this.myFormAllDay.value.toDate!;
    const comment = this.myFormAllDay.value.comment!;
    const absence: Absence = {
      fromDate,
      toDate,
      wholeDay: true,
      comment,
      id: this.data?.absence?.id,
    };
    this.ref.close(absence);
    console.log(absence);
  }

  onSavePartDay() {
    if (!this.myFormPartDay.valid) {
      return;
    }
    const date = this.myFormPartDay.value.date!;
    const fromTime = this.myFormPartDay.value.fromTime!;
    const toTime = this.myFormPartDay.value.toTime!;
    const comment = this.myFormPartDay.value.comment!;
    const fromDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      fromTime.getHours(),
      fromTime.getMinutes(),
    );
    const toDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      toTime.getHours(),
      toTime.getMinutes(),
    );

    const absence: Absence = {
      fromDate,
      toDate,
      wholeDay: false,
      comment,
      id: this.data?.absence?.id,
    };
    this.ref.close(absence);
    console.log(absence);
  }

  onCancel() {
    this.ref.close(undefined);
  }
}
