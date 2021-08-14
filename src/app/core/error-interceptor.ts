import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ErrorsComponent } from 'src/app/core/erros/errors.component';
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An known error occured!';
                if( error.error.message) {
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorsComponent, { 
                    height: '15rem',
                    width: '20rem', 
                    data: { message: errorMessage } 
                });   
                return throwError(error);
            })
        );
    }
}