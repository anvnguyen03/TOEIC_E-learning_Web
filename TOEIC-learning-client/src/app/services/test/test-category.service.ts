import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestCategoryService {

  private baseUrl: string = "http://localhost:8080/api/v1/test-categories";
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`)
  }
}
