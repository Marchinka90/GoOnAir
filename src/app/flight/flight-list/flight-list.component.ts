import { Component } from '@angular/core';
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

  constructor(private flightService: FlightService) {
    this.isLoading = true;
    this.fetchThemes();
  }

  fetchThemes(): void {
    this.flightService.loadFlights().subscribe(data => {
      this.flights = data.flights;
      this.isLoading = false;
    });
  }

}
