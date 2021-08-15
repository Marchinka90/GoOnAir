import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { IFlight } from 'src/app/shared/interfaces';
import { FlightService } from '../flight.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  isLoading: boolean = false;
  flight: IFlight | any;
  mode!: string;
  form!: FormGroup;
  imagePreview!: string;
  private flightId!: string;

  constructor(
    private flightService: FlightService,
    public route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'destination': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'city': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'date': new FormControl(null, { validators: [Validators.required] }),
      'time': new FormControl(null, { validators: [Validators.required] }),
      'seats': new FormControl(null, { validators: [Validators.required] }),
      'price': new FormControl(null, { validators: [Validators.required] }),
      'description': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has('flightId')) {
        this.mode = 'edit';
        this.isLoading = true;
        this.flightId = paramMap.get('flightId')!;
        this.flight = this.flightService.getFlight(this.flightId).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.flight = res.flight;
            this.form.setValue({ 
              destination: this.flight.destination, 
              city: this.flight.city,
              date: this.flight.date, 
              time: this.flight.time, 
              seats: this.flight.seats, 
              price: this.flight.price,
              description: this.flight.description,   
              image: this.flight.imagePath
            });
          },
          error: (err) => {
            this.isLoading = false;
          }
        });

      } else {
        this.mode = 'create';
        this.flightId = '',
        this.flight = '';
      }
    });
  }

  onSaveFlight() {
    if (this.form.invalid) { return ;}
    this.isLoading = true;
    const flightData = {
      
    }
    if (this.mode == 'create'){
      this.flightService.saveFlight(
        this.form.value.destination,
        this.form.value.city,
        this.form.value.date,
        this.form.value.time,
        this.form.value.seats,
        this.form.value.price,
        this.form.value.description,
        this.form.value.image,
        ).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.isLoading = false; 
        }
      });
    } else {
      this.flightService.updateFlight(this.flightId, 
        this.form.value.destination,
        this.form.value.city,
        this.form.value.date,
        this.form.value.time,
        this.form.value.seats,
        this.form.value.price,
        this.form.value.description,
        this.form.value.image
        ).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.isLoading = false;  
        }
      });
    }
  }

  onImagePicked(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity(); 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

}
