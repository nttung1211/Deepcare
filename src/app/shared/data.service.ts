import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Data } from './Data.model';


@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  table: string;
  data: Data = {
    services: [],
    features: [],
    qna: [],
    companies: [],
    doctors: [],
    news: [],
    introduction: []
  };

  constructor(private http: HttpClient) { }

  create(data: T) {
    return this.http.post<T>(
      `${environment.apiHost}/${this.table}`,
      data
    );
  }

  single(): Observable<T> {
    return this.http.get<T>(
      `${environment.apiHost}/${this.table}`
    );
  }

  all(): Observable<T[]> {
    return this.http.get<T[]>(
      `${environment.apiHost}/${this.table}`
    );
  }

  find(queryString: string): Observable<T[]> {
    queryString = typeof(queryString) === 'string'
      && queryString.length > 0 ?
      '?' + queryString :
      "";

    return this.http.get<T[]>(`${environment.apiHost}/${this.table}${queryString}`);
  }
  
  findOne(id: string): Observable<T> {
    return this.http.get<T>(`${environment.apiHost}/${this.table}/${id}`);
  }
}

