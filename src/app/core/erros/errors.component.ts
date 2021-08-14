import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-erros',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}, public dialogRef: MatDialogRef<ErrorsComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
