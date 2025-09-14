import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Treatment } from '../../../shared/models/models';

@Component({
  selector: 'app-treatment-dialog',
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatInput,
    MatButton,
    MatLabel,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './dialog-treatment.component.html',
  styleUrl: './dialog-treatment.component.css',
})
export class DialogTreatmentComponent implements OnInit {
  public data: { title: string | undefined; treatment: Treatment } =
    inject(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<DialogTreatmentComponent>);

  myForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    }),
    price: new FormControl<number>(0, {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    durationWorker: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    durationClient: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
  });

  ngOnInit(): void {
    if (this.data?.treatment) {
      this.myForm.controls.name.setValue(this.data.treatment.name);
      this.myForm.controls.price.setValue(this.data.treatment.price);
      this.myForm.controls.durationWorker.setValue(
        this.data.treatment.durationForWorker,
      );
      this.myForm.controls.durationClient.setValue(
        this.data.treatment.durationForClient,
      );
    }
  }

  onSave() {
    if (!this.myForm.valid) {
      return;
    }
    const name = this.myForm.value.name!;
    const price = this.myForm.value.price!;
    const durationForWork = this.myForm.value.durationWorker!;
    const durationForClient = this.myForm.value.durationClient!;
    const treatment: Treatment = {
      name,
      price,
      durationForWorker: durationForWork,
      durationForClient,
      id: this.data?.treatment?.id,
    };

    this.ref.close(treatment);
  }

  onCancel() {
    this.ref.close(undefined);
  }
}
