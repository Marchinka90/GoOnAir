import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
// import { FlightModule } from './flight/flight.module';
// import { UserModule } from './user/user.module';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    // FlightModule,
    // UserModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
