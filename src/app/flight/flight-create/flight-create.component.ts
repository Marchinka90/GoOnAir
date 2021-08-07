import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  isLoading: boolean = false;
  
  constructor(
    private flightService: FlightService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSaveFlight(form: NgForm) {
    if (form.invalid) { return ;}
    this.isLoading = true;

    this.flightService.saveFlight(form.value).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
