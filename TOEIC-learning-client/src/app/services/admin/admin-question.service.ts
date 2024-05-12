import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminQuestionService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  private baseUrl = 'http://localhost:8080/api/v1/admin/question'

  uploadExcelQuesions(form: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/upload-excel`, form)
  }

  uploadImages(form: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/upload-image`, form)
  }

  uploadAudio(form: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/upload-audio`, form)
  }
}
