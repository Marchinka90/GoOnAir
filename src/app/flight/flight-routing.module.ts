import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { UserGuard } from '../user/user.guard';

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
        component: FlightCreateComponent,
    },
    {
        path: 'flights/edit/:flightId',
        component: FlightCreateComponent,
    },
    {
        path: 'flights/view/:flightId',
        component: FlightViewComponent,
        canActivate: [AuthGuard, UserGuard]
    }

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, UserGuard]
})
export class FlightRoutingModule { }