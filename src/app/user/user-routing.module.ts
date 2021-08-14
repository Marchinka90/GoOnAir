import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MyFlightsComponent } from './my-flights/my-flights.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
    { 
        path: 'profile', 
        component: ProfileViewComponent, 
        canActivate: [AuthGuard, UserGuard]
    },
    { 
        path: 'profile/edit', 
        component: ProfileEditComponent,
        canActivate: [AuthGuard, UserGuard]
    },
    { 
        path: 'my-flights', 
        component: MyFlightsComponent,
        canActivate: [AuthGuard, UserGuard]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, UserGuard]
})
export class UserRoutingModule { }