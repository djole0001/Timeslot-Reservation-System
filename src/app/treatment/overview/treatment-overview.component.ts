import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectTreatments,
  selectTreatmentsIsLoading,
} from '../../store/salon.selectors';
import {
  addNewTreatment,
  deleteTreatment,
  loadTreatments,
  updateTreatment,
} from '../../store/salon.actions';
import { DialogTreatmentComponent } from './dialog-treatment/dialog-treatment.component';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { DIALOG_ANIMATION_TIME } from '../../shared/constants';
import { Treatment } from '../../shared/models/models';
import { MatIcon } from '@angular/material/icon';
import { DialogService } from '../../shared/services/dialog.service';
import { filter } from 'rxjs';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-treatment-overview',
  imports: [AsyncPipe, MatButton, MatDialogActions, MatIcon, TimePipe],
  templateUrl: './treatment-overview.component.html',
  styleUrl: './treatment-overview.component.css',
})
export class TreatmentOverviewComponent {
  private store: Store<AppState> = inject(Store);
  private dialogService = inject(DialogService);
  private toastr = inject(ToastrService);

  protected readonly treatments$ = this.store.select(selectTreatments);
  protected readonly isLoading$ = this.store.select(selectTreatmentsIsLoading);

  private matDialog = inject(MatDialog);

  constructor() {
    this.store.dispatch(loadTreatments());
  }

  editDialog(treatment: Treatment) {
    let dialog = this.matDialog.open(DialogTreatmentComponent, {
      width: '600px',
      enterAnimationDuration: DIALOG_ANIMATION_TIME,
      exitAnimationDuration: DIALOG_ANIMATION_TIME,
      disableClose: true,
      data: {
        title: 'Treatment edit',
        treatment: { ...treatment },
      },
    });
    dialog
      .afterClosed()
      .pipe(filter((result: Treatment) => !!result))
      .subscribe((updatedTreatment) => {
        this.store.dispatch(updateTreatment({ treatment: updatedTreatment }));
      });
  }

  openDialog() {
    let dialog = this.matDialog.open(DialogTreatmentComponent, {
      width: '600px',
      enterAnimationDuration: DIALOG_ANIMATION_TIME,
      exitAnimationDuration: DIALOG_ANIMATION_TIME,
      disableClose: false,
      data: {
        title: 'Create treatment',
        treatment: undefined,
      },
    });
    dialog
      .afterClosed()
      .pipe(filter((result: Treatment) => !!result))
      .subscribe((treatment) => {
        this.store.dispatch(addNewTreatment({ treatment }));
        this.toastr.success('Treatment successfully created!', '', {
          positionClass: 'toast-top-right',
          timeOut: 3000,
        });
      });
  }

  onDelete(treatment: Treatment) {
    const treatmentId = treatment.id;
    if (!treatmentId) {
      console.log(
        'This id is not okay please select another treatment to delete!',
      );
      return;
    }
    this.dialogService
      .openConfirmDialog('Are you sure to delete this treatment?')
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => this.store.dispatch(deleteTreatment({ treatmentId })));
  }
}
