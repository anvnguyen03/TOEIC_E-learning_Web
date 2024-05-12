import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userURL = "http://localhost:8080/api/v1/user";

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getEmployeeUsers(): Observable<User[]>|null {
    const headers: HttpHeaders = this.authService.getHeader()
    return this.httpClient.get<User[]>(`${this.userURL}/all-employee`, { headers: headers} );
  }
  changeUserInfo(newFullname: string | null, newPassword: string | null): Observable<any> {

    const headers: HttpHeaders = this.authService.getHeader()

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
  getUserInfo(): Observable<any> {
    const headers:HttpHeaders = this.authService.getHeader();
    return this.httpClient.get(`${this.userURL}/current`, { headers: headers });
  }
}
