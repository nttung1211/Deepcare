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
import { OverlayComponent } from './overlay/overlay.component';
import { ShortenPipe } from './shorten.pipe';



@NgModule({
  declarations: [
    // DIRECTIVES
    DropdownDirective,
    RevealAnimateDirective,
    ReachToDirective,
    // COMPONENTS
    PostsComponent,
    PostDetailComponent,
    FlashComponent,
    OverlayComponent,
    // PIPES
    ShortenPipe
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
    OverlayComponent,
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
    ReachToDirective,
    // PIPES
    ShortenPipe
  ]
})
export class SharedModule {}