import { Image } from 'src/app/shared/Image.model';

export class HomeFeature {
  id: string;
  title?: string;
  content?: string;
  image?: Image;
  createdAt?: string;
  updatedAt?: string;
  published_at?: string;
}