import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HelpersService} from '../shared/helpers.service';
import { Post, PostService } from '../shared/post.service';
import { Size } from '../shared/Size';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  private subscription: Subscription;
  @Input('queryString') queryString = '';
  posts = [];
  page = 1;

  constructor(
    private postSevice: PostService,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
    ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.subscription = this.postSevice.find(this.queryString).subscribe((posts: Post[]) => {
      this.posts = posts.map(post => {
        post.subtitle = this.helpers.shortenString(post.subtitle, 100);
        post.image.url = this.helpers.getRelevantSize(post, Size.Small);
        return post;
      });
      
      this.spinner.hide();
    });
  }

  onPageChange(e: any) {
    this.page = e;
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
