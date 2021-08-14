import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { FlightService } from '../flight.service';
import { IFlight } from 'src/app/shared/interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent {

  flights: IFlight[] = [];
  isLoading: boolean = false
  totalFlights: number = 0;
  flightsPerPage: number = 3;
  currentPage: number = 1;
  pageSizeOptions = [1, 3, 6, 9];
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
    this.flightService.loadFlights(this.flightsPerPage, this.currentPage).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.flights = res.flights;
        this.totalFlights = res.maxFlights;
      },
      error: (err) => {
        this.isLoading = false;          
      }
    });
  }

  onDelete(flightId: string) {
    this.isLoading = true;
    this.flightService.deleteFlight(flightId).subscribe(() => {
      this.fetchFlights();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1
    this.flightsPerPage = pageData.pageSize;
    this.flightService.loadFlights(this.flightsPerPage, this.currentPage).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.flights = res.flights;
        this.totalFlights = res.maxFlights;
      },
      error: (err) => {
        this.isLoading = false;          
      }
    });
  }
}
