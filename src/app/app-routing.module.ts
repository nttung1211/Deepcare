import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'news',
    component: NewsComponent,
  },

  {
    path: 'news/:id',
    component: NewsDetailComponent
  },



  { path: 'not-found', component: ErrorPageComponent },
  
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], // auto scroll to top on changing route
  exports: [RouterModule]
})
export class AppRoutingModule { }
