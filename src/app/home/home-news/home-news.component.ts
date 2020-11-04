import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/posts/Post.model';
import { DataService } from 'src/app/shared/data.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size.enum';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {
  posts: Post[];
  maxPosts = 4;

  constructor(
    private dataService: DataService<Post>,
    private helpers: HelpersService,
    ) { }


  ngOnInit(): void {
    this.dataService.table = 'posts';
    this.dataService.find(`_limit=${this.maxPosts}`).subscribe((posts: Post[]) => {
      this.posts = posts.map(post => {
        post.updatedAt = this.helpers.getStringDate(new Date(post.updatedAt));
        post.subtitle = this.helpers.shortenString(post.subtitle, 70);
        post.image.url = this.helpers.getRelevantSize(post.image, Size.Small);
        return post;
      });
    });
  }


}
