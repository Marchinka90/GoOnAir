import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightRoutingModule } from './flight-routing.module';
import { FlightService } from './flight.service';
import { FlightCreateComponent } from './flight-create/flight-create.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlightViewComponent } from './flight-view/flight-view.component';


@NgModule({
    declarations: [
        FlightListComponent,
        FlightCreateComponent,
        FlightViewComponent,
    ],
    imports: [
        CommonModule,
        FlightRoutingModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
    ],
    exports: [
        FlightListComponent,
        FlightCreateComponent,
        FlightViewComponent
    ],
    providers: [FlightService]
})
export class FlightModule { }
