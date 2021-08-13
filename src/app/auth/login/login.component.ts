import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
    this.authService.loginUser(this.form.value);
    this.isLoading = false;
  }


}
