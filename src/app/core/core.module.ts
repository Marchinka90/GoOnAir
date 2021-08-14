import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrosComponent } from './erros/erros.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { appInterceptorProvider } from './app-interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ErrosComponent,
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
        ErrosComponent,
        NotFoundComponent
    ],
    providers: [
        appInterceptorProvider
    ]
})
export class CoreModule { }
