import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  private _post;
  private paramsSubscription: Subscription;
  private postSubscription: Subscription;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  set post(post) {
    this._post = post;
  }

  get post() {
    return this._post;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.postSubscription = this.newsService.getOnePost(params['id']).subscribe(
          post => {
            this.post = post;
            this.spinner.hide();
          }
        ); 
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }

}
