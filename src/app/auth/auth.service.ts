import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    private role: string = 'guest';
    private token: string = '';
    private userId: string = '';

    getToken() { return this.token; }

    getUserId() { return this.userId; }
    
    getAuth() { return this.role; }

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    createUser(data: any) {
        return this.http.post<{message: string, token: string, role: string, userId: string}>(`/api/users/register`, data);
    }

    loginUser(data: any) {
        return this.http.post<{message: string, token: string, role: string, userId: string}>(`/api/users/login`, data);
    }

    logoutUser() {
        this.token = '';
        this.userId = '';
        this.role = 'guest';
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(authInformation) {
            this.token = authInformation.token;
            this.role = authInformation.role!;        
            this.userId = authInformation.userId!; 
        }
    }

    saveAuthData(token: string, role: string, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        if (!token) {
            return;
        }

        return { 
            token: token,
            role: role,
            userId: userId
        }
    }

}