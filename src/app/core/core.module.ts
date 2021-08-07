import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { appInterceptorProvider } from './app-interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        MatToolbarModule,        
        MatButtonModule,

    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ],
    providers: [
        appInterceptorProvider
    ]
})
export class CoreModule { }
