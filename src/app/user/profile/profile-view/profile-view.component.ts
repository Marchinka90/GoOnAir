import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  isLoading: boolean = false;
  user: IUser | undefined;

  constructor(private userService: UserService) {
    this.profile();
  }

  ngOnInit() {
    this.user = this.userService.getUserData();
  }

  profile() {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
        this.userService.saveUserData(this.user);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
}
