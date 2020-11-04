import { NgModule } from '@angular/core';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { SharedModule } from '../shared/shared.module';
import { NewsDetailComponent } from './news-detail/news-detail.component';


@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
