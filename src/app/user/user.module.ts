import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    exports: [
        RegisterComponent,
        LoginComponent,
    ],
    providers: []
})
export class UserModule { }
