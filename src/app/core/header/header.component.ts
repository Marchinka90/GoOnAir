import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  get auth(): string {
    return this.authService.auth;
  }

  get username() {
    return this.authService.user?.username || '';
  }

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
