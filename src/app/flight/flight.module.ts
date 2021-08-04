import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightRoutingModule } from './flight-routing.module';
import { FlightService } from './flight.service';


@NgModule({
    declarations: [
        FlightListComponent,
    ],
    imports: [
        CommonModule,
        FlightRoutingModule
    ],
    exports: [
        FlightListComponent,
    ],
    providers: [FlightService]
})
export class FlightModule { }
