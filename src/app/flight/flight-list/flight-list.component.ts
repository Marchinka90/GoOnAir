import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IFlight } from 'src/app/shared/interfaces';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {

  flights: IFlight[] = [];
  isLoading: boolean = false
  get auth(): string {
    return this.authService.getAuth();
  }

  constructor(
    private flightService: FlightService,
    private authService: AuthService,
    private router: Router
    ) {
      this.fetchFlights();
  }

  fetchFlights(): void {
    this.isLoading = true;
    this.flightService.loadFlights().subscribe(data => {
      this.flights = data.flights;
      this.isLoading = false;
    });
  }

  onDelete(flightId: string) {
    this.isLoading = true;
    this.flightService.deleteFlight(flightId).subscribe({
      next: () => {
        this.fetchFlights();
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.isLoading = false;
  }
}
