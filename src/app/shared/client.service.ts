import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  post(data : {
    fullname: string,
    phone: string,
    message: string,
    service: string
  }) {
    return this.http
      .post<Object>(
        "http://localhost:1337/clients",
        data
      );
  }
}
