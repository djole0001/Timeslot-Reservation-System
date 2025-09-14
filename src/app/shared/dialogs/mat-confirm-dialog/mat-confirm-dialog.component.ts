import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mat-confirm-dialog',
  imports: [MatButton, MatDialogClose],
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrl: './mat-confirm-dialog.component.css',
})
export class MatConfirmDialogComponent {
  public data = inject(MAT_DIALOG_DATA);
  private toastr = inject(ToastrService);

  deleteSuccess() {
    this.toastr.error('Treatment deleted!');
  }
}
