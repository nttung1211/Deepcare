import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size';
import { PostService, Post } from '../../shared/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  relatedPosts: Post[] = [];
  maxRelatedPosts = 3;
  private paramsSubscription: Subscription;
  private postSubscription: Subscription;
  private relatedPostSubscription: Subscription;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
  ) { }


  ngOnInit(): void {
    this.spinner.show();
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.postSubscription = this.postService.findOne(params['id']).subscribe(
          (post: Post) => {
            this.post = post;
            this.spinner.hide();

            let queryString = '';
            post.tags.forEach((tag, i) => {
              queryString += `tags.name=${tag.name + (i === post.tags.length - 1 ? `&_limit=${this.maxRelatedPosts + 1}` : '&')}`
            });

            this.relatedPostSubscription = this.postService.find(queryString).subscribe(
              (posts: Post[]) => {
                for (let i = 0; i < posts.length; i++) {
                  if (posts[i].id !== params['id'] && this.relatedPosts.length < this.maxRelatedPosts) {
                    posts[i].subtitle = this.helpers.shortenString(posts[i].subtitle, 100);
                    posts[i].image.url = this.helpers.getRelevantSize(posts[i], Size.Small);
                    this.relatedPosts.push(posts[i]);
                  }
                }
              }
            );
          }
        ); 
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
    this.relatedPostSubscription.unsubscribe();
  }

}
