import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { UserService } from './user.service';
import { MyFlightsComponent } from './my-flights/my-flights.component';

@NgModule({
    declarations: [
        ProfileEditComponent,
        ProfileViewComponent,
        MyFlightsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        UserRoutingModule
    ],
    exports: [
        ProfileEditComponent,
        ProfileViewComponent,
        MyFlightsComponent
    ],
    providers: [UserService]
})
export class UserModule { }
