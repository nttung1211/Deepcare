import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { HelpersService } from '../shared/helpers.service';
import { Size } from '../shared/Size.enum';
import { Post } from './Post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private subscription: Subscription;
  @Input() queryString: string;
  @Input() storage: string;
  posts = [];
  page = 1;

  constructor(
    private dataSevice: DataService<Post>,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    if (!this.dataSevice.data[this.storage].length) {
      this.spinner.show();
      this.dataSevice.table = 'posts';
      this.subscription = this.dataSevice.find(this.queryString).subscribe((posts: Post[]) => {
        posts = posts.map(post => {
          post.subtitle = this.helpers.shortenString(post.subtitle, 100);
          post.image.url = this.helpers.getRelevantSize(post.image, Size.Medium);
          return post;
        });

        this.dataSevice.data[this.storage] = posts;
        this.posts = this.dataSevice.data[this.storage];
        this.spinner.hide();
      });
    } else {
      this.posts = this.dataSevice.data[this.storage];
    }
  }

  onPageChange(e: any) {
    this.page = e;
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
