import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { FlightService } from '../flight.service';
import { IFlight } from 'src/app/shared/interfaces';

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
    ) {
      this.fetchFlights();
  }

  fetchFlights(): void {
    this.isLoading = true;
    this.flightService.loadFlights().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.flights = res.flights;
      },
      error: (err) => {
        this.isLoading = false;          
      }
    });
  }

  onDelete(flightId: string) {
    this.isLoading = true;
    this.flightService.deleteFlight(flightId).subscribe({
      next: (res) => {
        this.fetchFlights();
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
}
