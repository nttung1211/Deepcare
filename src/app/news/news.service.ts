import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private _posts = [];
  private _page = 1;

  constructor(private http: HttpClient) { }

  set posts(posts) {
    this._posts = posts;
  }

  get posts() {
    return this._posts;
  }

  set page(page: number) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  getALlPosts() {
    return this.http.get<any[]>(
      'https://deepcare-cms.herokuapp.com/posts'
      );
  }

  getPosts(limit: number = 10, start: number = 1) {
    if (start <= 0) start = 1;

    return this.http.get<any[]>(
      `https://deepcare-cms.herokuapp.com/posts?_limit=${limit}&_start=${start - 1}`
      );
  }

  getOnePost(id: string) {
    return this.http.get(`https://deepcare-cms.herokuapp.com/posts/${id}`);
  }
}
