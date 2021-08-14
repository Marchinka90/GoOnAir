import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorsComponent } from './erros/errors.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { appInterceptorProvider } from './app-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ErrorsComponent,
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        MatToolbarModule,        
        MatButtonModule,
        MatCardModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ErrorsComponent,
        NotFoundComponent
    ],
    providers: [
        appInterceptorProvider,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ]
})
export class CoreModule { }
