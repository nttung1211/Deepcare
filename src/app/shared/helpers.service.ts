import { Injectable } from '@angular/core'
import { Image } from './Image.model';
import { Size } from './Size.enum';

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

  getRelevantSize(image: Image, size: Size): string {
    const url = 
      typeof(image.formats.large) === 'object' && 
      ![Size.Medium, Size.Small, Size.Thumbnail].includes(size) ?
      image.formats.large.url : 

      typeof(image.formats.medium) === 'object' && 
      ![Size.Small, Size.Thumbnail].includes(size) ?
      image.formats.medium.url :

      typeof(image.formats.small) === 'object' && 
      ![Size.Thumbnail].includes(size) ?
      image.formats.small.url :

      typeof(image.formats.thumbnail) === 'object' ? 
      image.formats.thumbnail.url :

      image.url;

    return url;
  }
}

