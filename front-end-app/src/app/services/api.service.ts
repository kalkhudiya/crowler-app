import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(this.url + url);
  }

  post(url, body) {
    return this.http.post(this.url + url, body);
  }

  put(url, body) {
    return this.http.put(this.url + url, body);
  }
  
  delete(url) {
    return this.http.delete(this.url + url);
  }
}
