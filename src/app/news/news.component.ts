import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private _newsPosts = [];
  private _page: number;

  constructor(
    private newsSevice: NewsService,
    private spinner: NgxSpinnerService
    ) {

  }

  updatePageInService() {
    this.newsSevice.page = this.page;
  }

  ngOnInit(): void {
    this.page = this.newsSevice.page;
    
    if (!this.newsSevice.posts.length) {
      this.spinner.show();
      this.newsSevice.getALlPosts().subscribe((posts) => {
        posts = posts.map(post => {
          post.content = this.shorten(post.content, 100);
          this.spinner.hide();
          return post;
        });
        
        this.newsSevice.posts = posts;
        this.newsPosts = this.newsSevice.posts;
      });
    } else {
      this.newsPosts = this.newsSevice.posts;
    }
    
  }

  private shorten(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      str = str.slice(0, maxLength) + '...';
    }
    return str;
  }


  // GETTERS AND SETTERS
  set page(page: number) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  set newsPosts(posts: any[]) {
    this._newsPosts = posts;
  }

  get newsPosts() {
    return this._newsPosts;
  }
}
