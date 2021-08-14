import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ErrosComponent } from 'src/app/core/erros/erros.component';
import { IFlight } from 'src/app/shared/interfaces';
import { FlightService } from '../flight.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-flight-view',
  templateUrl: './flight-view.component.html',
  styleUrls: ['./flight-view.component.css']
})
export class FlightViewComponent implements OnInit {

  isLoading: boolean = false;
  flight: IFlight | any;
  isUserBooked: boolean = false;
  private userId: string = '';
  private flightId!: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private flightService: FlightService,
    private authSerivece: AuthService,
    private dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        this.isLoading = true;
        this.flightId = paramMap.get('flightId')!;
        this.flight = this.flightService.getFlight(this.flightId).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.flight = res.flight;
            this.userId = this.authSerivece.getUserId();
            let isBooked = this.flight.passengers.filter((f: string) => f == this.userId);
            if(isBooked.length > 0) {
              this.isUserBooked = true;
            }
          },
          error: (err) => {
            this.getErrorsDialog(err);   
          }
        });
      },
      error: (err) => {
        this.getErrorsDialog(err);   
      }
    });

  }

  onBooking() {
    this.isLoading = true;
    this.flightService.onBookingFlight(this.flightId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/user/my-flight']);
      },
      error: (err) => {
        this.getErrorsDialog(err);   
      }
    });
  }

  private getErrorsDialog(err: any) {
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

}
