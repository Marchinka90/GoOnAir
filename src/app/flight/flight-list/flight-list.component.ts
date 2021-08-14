import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/auth/auth.service';
import { FlightService } from '../flight.service';
import { IFlight } from 'src/app/shared/interfaces';
import { ErrosComponent } from 'src/app/core/erros/erros.component';

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
    private dialog: MatDialog,
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
    });
  }
}
