import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminTestService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private baseUrl = 'http://localhost:8080/api/v1/admin/test'

  changeStatus(id: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/change-status`, id, {
      headers: this.addAuthorizationHeader()
    })
  }

  createTest(testDto: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/new`, testDto, {
      headers: this.addAuthorizationHeader()
    })
  }

  private addAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
  }
}
