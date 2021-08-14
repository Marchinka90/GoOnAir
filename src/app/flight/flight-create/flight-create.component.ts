import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IFlight } from 'src/app/shared/interfaces';
import { FlightService } from '../flight.service';
import { ErrosComponent } from 'src/app/core/erros/erros.component';

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
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('flightId')) {
        this.mode = 'edit';
        this.isLoading = true;
        this.flightId = paramMap.get('flightId')!;
        this.flight = this.flightService.getFlight(this.flightId).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.flight = res.flight;
          },
          error: (err) => {
            this.getErrorsDialog(err);   
          }
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
          this.isLoading = false;
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.getErrorsDialog(err);  
        }
      });
    } else {
      this.flightService.updateFlight(this.flightId, form.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.getErrorsDialog(err);  
        }
      });
    }
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
