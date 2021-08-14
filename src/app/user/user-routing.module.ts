import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
    { 
        path: 'user/profile', 
        component: ProfileViewComponent, 
        canActivate: [AuthGuard, UserGuard]
    },
    { 
        path: 'user/profile/edit', 
        component: ProfileEditComponent,
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