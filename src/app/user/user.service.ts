import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../shared/interfaces';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    
    private user: IUser | undefined;

    getUser() { return this.user; }

    constructor(private http: HttpClient, private router: Router) { }

    getProfile() {
        return this.http.get<{message: string, user: IUser }>('/api/users/profile').subscribe({
            next: (res) => {
                this.user = res.user;
                this.saveUserData(this.user);
            },
            error: (err) => {
                console.log(err)
            }
        });
    }

    editUser(data: any) {
        return this.http.put<{message: string, user: IUser }>('/api/users/profile/edit', data).subscribe({
            next: (res) => {
                this.user = res.user;
                this.saveUserData(this.user);
                this.router.navigate(['/user/profile']);
            },
            error: (err) => {
                console.log(err)
            }
        });
    }

    saveUserData(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    clearUserData() {
        localStorage.removeItem('user');
    }

    getUserData() {
        const user = localStorage.getItem('user');
        if (!user) {
            return;
        }

        return JSON.parse(user);
    }
}