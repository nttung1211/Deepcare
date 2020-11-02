import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../shared/post.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) {}

  getFeatures() : Observable<Post[]> {
    return this.http.get<Post[]>(
      `${environment.apiHost}/home-features`
    );
  }

}
