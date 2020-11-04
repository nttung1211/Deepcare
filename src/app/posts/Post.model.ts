import { Image } from '../shared/Image.model';

export class Post {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: Image;
  createdAt?: string;
  updatedAt?: string;
  published_at?: string;
  tags?: any[];
}