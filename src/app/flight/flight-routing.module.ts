import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightCreateComponent } from './flight-create/flight-create.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightViewComponent } from './flight-view/flight-view.component';

const routes: Routes = [
    {
        path: '',
        component: FlightListComponent
    },
    {
        path: 'flights/create',
        component: FlightCreateComponent
    },
    {
        path: 'flights/edit/:flightId',
        component: FlightCreateComponent
    },
    {
        path: 'flights/view/:flightId',
        component: FlightViewComponent
    }

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlightRoutingModule { }