import { Image } from '../shared/Image.model';

export class Service {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string;
  icon?: string;
  image?: Image;
  // TODO: add Client model
  clients?: any[];
  createdAt?: string;
  updatedAt?: string;
  published_at?: string;
}