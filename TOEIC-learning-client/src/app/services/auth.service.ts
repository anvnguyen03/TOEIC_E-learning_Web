import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  private baseURL = "http://localhost:8080/api/v1/auth";
  private userURL = "http://localhost:8080/api/v1/user";
  private loginURL = "http://localhost:8080/api/v1/login";
  constructor(private httpClient: HttpClient) { }

  private token?: string | null
  getHeader():HttpHeaders{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }
  postLogin(signInRequest: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/signin`, signInRequest)
  }

  validateToken(token: any): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseURL}/validate-token`, token)
  }

  getUserRole() {
    this.token = this.getToken()
    if (!this.token) {
      return null
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]))
    return payload.role
  }

  getUsername() {
    this.token = this.getToken()
    if (!this.token) {
      return null
    }

    const payload = JSON.parse(atob(this.token.split('.')[1]))
    return payload.sub.split('@')[0]
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }
  // getUserInfo(): Observable<User> {
  //   return this.httpClient.get<User>(`${this.baseURL}/current`);
  // }
  getUserInfo(): Observable<any> {
    const headers:HttpHeaders = this.getHeader();
    return this.httpClient.get(`${this.userURL}/current`, { headers: headers });
  }

  changeUserInfo(newFullname: string | null, newPassword: string | null): Observable<any> {
    
    const headers:HttpHeaders = this.getHeader()

    // Include both 'newFullname' and 'newPassword' in the request body
    const body = {
      newFullname: newFullname, // Include 'newFullname'
      newPassword: newPassword
    };

    return this.httpClient.put(
      `${this.userURL}/change-info`,
      body,
      { headers: headers }
    );
  }
  sendFogotPasswordRequest(email: string):  Observable<any>{
    
    const body = { email: email, code:Math.floor(Date.now() * 1000).toString(36)};
    return this.httpClient.post(`${this.loginURL}/foget-password`,
    body
    )
  }
  resetPassword(email: string, password: string):  Observable<any> {
    const body = { email: email, password:password};
    return this.httpClient.put(`${this.loginURL}/reset-password`,
    body
    );
  }
}
