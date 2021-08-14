import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { appInterceptorProvider } from './app-interceptor';
import { ErrosComponent } from './erros/erros.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ErrosComponent,
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
        ErrosComponent
    ],
    providers: [
        appInterceptorProvider
    ]
})
export class CoreModule { }
