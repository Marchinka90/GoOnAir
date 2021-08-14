import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IFlight } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-flights',
  templateUrl: './my-flights.component.html',
  styleUrls: ['./my-flights.component.css']
})
export class MyFlightsComponent implements OnInit {

  isLoading: boolean = false;
  flights: IFlight[] | any = [];

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.userService.getFlightsByUserId().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.flights = res.flights;
      },
      error: (err) => {
          console.log(err)
      }
  });;
  }

}
