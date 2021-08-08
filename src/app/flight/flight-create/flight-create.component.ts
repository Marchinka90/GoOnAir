import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IFlight } from 'src/app/shared/interfaces';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  isLoading: boolean = false;
  flight: IFlight | any;
  mode!: string;
  private flightId!: string;

  constructor(
    private flightService: FlightService,
    public route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('flightId')) {
        this.mode = 'edit';
        this.isLoading = true;
        this.flightId = paramMap.get('flightId')!;
        this.flight = this.flightService.getFlight(this.flightId).subscribe(resData => {
          this.isLoading = false;
          this.flight = resData.flight;
        });

      } else {
        this.mode = 'create';
        this.flightId = '',
        this.flight = '';
      }
    });
  }

  onSaveFlight(form: NgForm) {
    if (form.invalid) { return ;}
    this.isLoading = true;
    if (this.mode == 'create'){
      this.flightService.saveFlight(form.value).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err)
        }
      });
    } else {
      this.flightService.updateFlight(this.flightId, form.value).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    this.isLoading = false;
  }
}
