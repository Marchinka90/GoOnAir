import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
    declarations: [
    CustomValidatorDirective,
    ShortenPipe
  ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
      CustomValidatorDirective,
      ShortenPipe
    ]
})
export class SharedModule { }
