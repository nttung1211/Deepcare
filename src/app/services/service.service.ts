import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _services = [];

  constructor(private http: HttpClient) { }

  set services(services) {
    this._services = services;
  }

  get services() {
    return this._services;
  }

  getALlServices() {
    return this.http.get<any[]>(
      `${environment.apiHost}/services`
      );
  }

  getServices(limit: number = 10, start: number = 1) {
    if (start <= 0) start = 1;

    return this.http.get<any[]>(
      `${environment.apiHost}/services?_limit=${limit}&_start=${start - 1}`
      );
  }

  getOneService(id: string) {
    return this.http.get(`${environment.apiHost}/services/${id}`);
  }
}
