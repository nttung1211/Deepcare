import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size.enum';
import { Post } from '../Post.model';
;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  @Input() storage: string;
  post: Post;
  relatedPosts: Post[] = [];
  maxRelatedPosts = 3;
  private paramsSubscription: Subscription;
  private postSubscription: Subscription;
  private relatedPostsSubscription: Subscription;

  constructor(
    private dataService: DataService<Post>,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!this.dataService.data[this.storage].length) {
          this.fetchPost(params['id']);
        } else {
          for (const post of this.dataService.data[this.storage]) {
            if (post.id === params['id']) {
              post.image.url = this.helpers.getRelevantSize(post.image, Size.Large);
              this.post = post;
              this.fetchRelatedPosts(params['id'], post);
              break;
            }
          }
        }
      }
    );
  }

  fetchPost(id: string) {
    this.spinner.show();
    this.dataService.table = 'posts';
    this.postSubscription = this.dataService.findOne(id).subscribe(
      post => {
        this.post = post;
        this.spinner.hide();
        this.fetchRelatedPosts(id, post);  
      }
    );
  }

  fetchRelatedPosts(id: string, post: Post) {
    let queryString = '';
    post.tags.forEach((tag, i) => {
      queryString += `tags.name=${tag.name + (i === post.tags.length - 1 ? `&_limit=${this.maxRelatedPosts + 1}` : '&')}`
    });

    this.relatedPostsSubscription = this.dataService.find(queryString).subscribe(
      (posts: Post[]) => {
        this.relatedPosts = this.proccessRealatedPosts(posts, id);
      }
    );
  }

  proccessRealatedPosts(posts: Post[], id: string) {
    const relatedPosts = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id !== id && relatedPosts.length < this.maxRelatedPosts) {
        posts[i].subtitle = this.helpers.shortenString(posts[i].subtitle, 100);
        posts[i].image.url = this.helpers.getRelevantSize(posts[i].image, Size.Large);
        relatedPosts.push(posts[i]);
      }
    }
    return relatedPosts;
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.relatedPostsSubscription) {
      this.relatedPostsSubscription.unsubscribe();
    }
  }

}
