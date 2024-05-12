import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  
  private audioBaseUrl = "http://localhost:8080/audios"
  private imageBaseUrl = "http://localhost:8080/images"
  constructor(private httpClient: HttpClient) { }

  getAudio(testName: any, fileName: any) {
    return `${this.audioBaseUrl}/${testName}/${fileName}`
  }

  getImage(testName: any, fileName: any) {
    return `${this.imageBaseUrl}/${testName}/${fileName}`
  }
}
