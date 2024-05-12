import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private baseUrl:string = "http://localhost:8080/api/v1/tests";
  constructor(private http: HttpClient) { }

  getAll(title:string, page:number, size:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?title=${title}&page=${page}&size=${size}`)
  }

  getAllNoPaging(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallnopaging`)
  }

  getAllByCategory(cate_name:string, title:string, page:number, size:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${cate_name}?title=${title}&page=${page}&size=${size}`)
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/id/${id}`)
  }
}
