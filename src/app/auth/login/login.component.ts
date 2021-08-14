import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrosComponent } from 'src/app/core/erros/erros.component';

import { emailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  isLoading: boolean = false;
  form: FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.isLoading = true;
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  
    });
    this.isLoading = false;
    }

  onLogin(): void {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    this.authService.loginUser(this.form.value).subscribe({
      next: (res) => {
        this.authService.saveAuthData(res.token, res.role, res.userId);
        this.authService.autoAuthUser();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.getErrorsDialog(err);         
      }
    });
  }

  private getErrorsDialog(err: any) {
    this.isLoading = false;
    let errorMessage = 'An known error occured!';
    if( err.error.message) {
      errorMessage = err.error.message;
    }
    this.dialog.open(ErrosComponent, { 
      height: '15rem',
      width: '20rem', 
      data: { message: errorMessage } 
    });     
  }


}
