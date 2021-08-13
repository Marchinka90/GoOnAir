import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';

const routes: Routes = [
    { 
        path: 'user/profile', 
        component: ProfileViewComponent, 
        canActivate: [AuthGuard]
    },
    { 
        path: 'user/profile/edit', 
        component: ProfileEditComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class UserRoutingModule { }