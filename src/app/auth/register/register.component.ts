import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { emailValidator, sameValueAsFactory } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  isLoading: boolean = false;

  killSubscription = new Subject();
  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
  ) {
    this.isLoading = true;
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, sameValueAsFactory(() => this.form?.get('password')!, this.killSubscription)]],
    });
    this.isLoading = false;
    }

  onRegister(): void {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    this.authService.createUser(this.form.value);
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }
}
