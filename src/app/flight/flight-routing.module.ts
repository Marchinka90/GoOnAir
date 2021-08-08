import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightCreateComponent } from './flight-create/flight-create.component';
import { FlightListComponent } from './flight-list/flight-list.component';

const routes: Routes = [
    {
        path: '',
        component: FlightListComponent
    },
    {
        path: 'create',
        component: FlightCreateComponent
    },
    {
        path: 'edit/:flightId',
        component: FlightCreateComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlightRoutingModule { }