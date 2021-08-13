import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  get auth(): string {
    return this.userService.auth;
  }

  get username() {
    return this.userService.user?.username || '';
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
