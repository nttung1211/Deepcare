import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { RevealAnimateDirective } from './reveal-animate.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule } from 'ngx-markdown';
import { PostsComponent } from '../posts/posts.component';
import { PostDetailComponent } from '../posts/post-detail/post-detail.component';
import { RouterModule } from '@angular/router';
import { ReachToDirective } from './reach-to.directive';
import { FlashComponent } from './flash/flash.component';



@NgModule({
  declarations: [
    DropdownDirective,
    RevealAnimateDirective,
    PostsComponent,
    PostDetailComponent,
    ReachToDirective,
    FlashComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MarkdownModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    // COMPONENTS
    PostsComponent,
    PostDetailComponent,
    FlashComponent,
    // MODULES
    CommonModule,
    MarkdownModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // DIRECTIVEES
    DropdownDirective,
    RevealAnimateDirective,
    ReachToDirective
  ]
})
export class SharedModule {}