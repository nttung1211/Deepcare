import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/news/news.service';
import { HelpersService } from 'src/app/shared/helpers.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit {

  private _newsPosts = [];

  constructor(private newsPostsSevice: NewsService, private helpersService: HelpersService) { }

  

  ngOnInit(): void {
    if (!this.newsPostsSevice.posts.length) {
      this.newsPostsSevice.getPosts(4, 1).subscribe((posts) => {
        posts = posts.map(post => {
          post.updatedAt = this.helpersService.getStringDate(new Date(post.updatedAt));
          return post;
        });
        
        this.newsPostsSevice.posts = posts;
        this.newsPosts = this.newsPostsSevice.posts;
      });
    } else {
      for (let i = 0; i < this.newsPostsSevice.posts.length; i++) {
        if (i === 4) break;
        this.addPost(this.newsPostsSevice.posts[i]);
      }
    }
  }

  addPost(post) {
    this.newsPosts.push(post);
  }
    
  set newsPosts(posts: any[]) {
    this._newsPosts = posts;
  }

  get newsPosts() {
    return this._newsPosts;
  }


}
