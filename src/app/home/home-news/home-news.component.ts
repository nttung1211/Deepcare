import { Component, OnInit } from '@angular/core';
import { Post, PostService } from 'src/app/shared/post.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {
  posts: Post[];
  maxPosts = 4;

  constructor(
    private postService: PostService,
    private helpers: HelpersService,
    ) { }


  ngOnInit(): void {
    this.postService.find(`_limit=${this.maxPosts}`).subscribe((posts: Post[]) => {
      this.posts = posts.map(post => {
        post.updatedAt = this.helpers.getStringDate(new Date(post.updatedAt));
        post.subtitle = this.helpers.shortenString(post.subtitle, 70);
        post.image.url = this.helpers.getRelevantSize(post, Size.Small);
        return post;
      });
    });
  }


}
