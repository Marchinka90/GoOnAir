import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-erros',
  templateUrl: './erros.component.html',
  styleUrls: ['./erros.component.css']
})
export class ErrosComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}, public dialogRef: MatDialogRef<ErrosComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
