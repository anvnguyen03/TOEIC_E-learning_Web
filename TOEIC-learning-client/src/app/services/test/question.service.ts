import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl:string = "http://localhost:8080/api/v1/questions";
  constructor(private httpClient: HttpClient) { }

  getQuestionsByTestId(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`)
  }
}
