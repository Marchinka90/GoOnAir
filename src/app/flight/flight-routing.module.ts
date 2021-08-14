import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { UserGuard } from '../user/user.guard';
import { AdminGuard } from '../admin/admin.guard';

import { FlightCreateComponent } from './flight-create/flight-create.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightViewComponent } from './flight-view/flight-view.component';

const routes: Routes = [
    {
        path: '',
        component: FlightListComponent
    },
    {
        path: 'create',
        component: FlightCreateComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'edit/:flightId',
        component: FlightCreateComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'view/:flightId',
        component: FlightViewComponent,
        canActivate: [AuthGuard, UserGuard]
    }

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, UserGuard, AdminGuard]
})
export class FlightRoutingModule { }