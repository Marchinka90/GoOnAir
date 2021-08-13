import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    user: IUser | undefined = undefined;

    get auth(): string {
        console.log(this.user)
    if(this.user !== undefined) {
      console.log(this.user.role);
      if(this.user.role == 'user'){ return 'user'}
      if(this.user.role == 'admin'){ return 'admin'}
    }
    return 'guest'
    }
    constructor(
        private http: HttpClient
    ) { }

    register(data: any) {
        return this.http.post<IUser>(`/api/users/register`, data).pipe(
            tap((user) => this.user = user)
        );
    }

}