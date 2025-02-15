import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', email);  // Map email to username
    body.set('password', password);
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>(`${environment.apiBaseUrl}/auth/login`, body.toString(), { headers }).pipe(
      tap(res => {
        localStorage.setItem('jwt_token', res.access_token);
        this.userSubject.next(res.user);
      })
    );
  }

  isLoggedIn(): boolean {
    // Check if a token exists in local storage
    const token = localStorage.getItem('jwt_token');
    return !!token; // Return true if token exists, false otherwise
  }

  
  getToken(): string | null {
    console.log("getToken() called");
    console.log(localStorage.getItem('jwt_token'));
    return localStorage.getItem('jwt_token');
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/users/me`);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.userSubject.next(null);
  }
}
