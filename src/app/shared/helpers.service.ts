import { Injectable } from '@angular/core';
import { Post } from './post.service';
import { Size } from './Size';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getStringDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

   shortenString(str: string, maxLength: number): string {
    if (typeof(str) === 'string' && str.length > maxLength) {
      str = str.slice(0, maxLength) + '...';
    }
    return str;
  }

  getRelevantSize(post: Post, size: Size): string {
    const url = 
      typeof(post.image.formats.large) === 'object' && 
      ![Size.Medium, Size.Small, Size.Thumbnail].includes(size) ?
      post.image.formats.large.url : 

      typeof(post.image.formats.medium) === 'object' && 
      ![Size.Small, Size.Thumbnail].includes(size) ?
      post.image.formats.medium.url :

      typeof(post.image.formats.small) === 'object' && 
      ![Size.Thumbnail].includes(size) ?
      post.image.formats.small.url :

      typeof(post.image.formats.thumbnail) === 'object' ? 
      post.image.formats.thumbnail.url :

      post.image.url;

    return url;
  }
}

