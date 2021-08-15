import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { emailValidator, sameValueAsFactory } from 'src/app/shared/validators';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnDestroy {

  isLoading: boolean = false;

  killSubscription = new Subject();
  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.isLoading = true;
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, sameValueAsFactory(() => this.form?.get('newPassword')!, this.killSubscription)]],
    });
    this.isLoading = false;
    }

  onEdit(): void {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    this.userService.editUser(this.form.value).subscribe({
      next: (res) => {
          this.userService.saveUserData(res.user);
          this.router.navigate(['/user/profile']);
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }

}
