import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },


  {
    path: 'services',
    loadChildren: () => import('./services/services.module')
      .then(m => m.ServicesModule)
  },

  {
    path: 'instruction',
    loadChildren: () => import('./instruction/instruction.module')
      .then(m => m.InstructionModule)
  },
  
  { 
    path: 'news', 
    loadChildren: () => import('./news/news.module')
      .then(m => m.NewsModule) 
  },


  { 
    path: 'partners', 
    loadChildren: () => import('./partners/partners.module')
      .then(m => m.PartnersModule) 
  },

  { path: 'introduction', loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule) },
  
  { path: 'not-found', component: ErrorPageComponent },
  { path: 'doctors', loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule) },

  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // auto scroll to top on changing route
      preloadingStrategy: PreloadAllModules
    })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
