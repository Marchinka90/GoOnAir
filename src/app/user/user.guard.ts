import { Injectable } from "@angular/core";
import { 
    ActivatedRouteSnapshot, 
    CanActivate, 
    Router, 
    RouterStateSnapshot, 
    } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserGuard implements CanActivate{

    constructor(
        private authService: AuthService, 
        private router: Router
        ) { }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): Observable<boolean>| Promise<boolean> | boolean  {
            const auth = this.authService.getAuth();
            if (auth != 'user') {
                this.router.navigate(['/'])
            }
            return true;
        }
}