import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export class Post {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: {
    formats?: {
      large?: { url?: string },
      medium?: { url?: string },
      small?: { url?: string },
      thumbnail?: { url?: string }
    },
    url?: string
  };
  createdAt?: string;
  updatedAt?: string;
  published_at?: string;
  tags?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }


  all(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${environment.apiHost}/posts`
    );
  }

  find(queryString: string): Observable<Post[]> {
    queryString = typeof(queryString) === 'string'
      && queryString.length > 0 ?
      '?' + queryString :
      "";

    return this.http.get<Post[]>(`${environment.apiHost}/posts${queryString}`);
  }
  
  findOne(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiHost}/posts/${id}`);
  }
}

