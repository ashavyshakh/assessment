import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  message: any ;
  cancelButtonText = 'Cancel';
  yesButtonText = 'Yes';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        this.yesButtonText = data.buttonText.yes || this.yesButtonText;
      }
    }
    this.dialogRef.updateSize('400vw', '500vw');
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  clickNo(): void {
    this.dialogRef.close('no');
}
  clickOk(): void {
    this.dialogRef.close('yes');
  }

}
