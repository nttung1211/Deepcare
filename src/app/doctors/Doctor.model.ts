import { Image } from '../shared/Image.model';

export class Doctor {
  id: string;
  fullname?: string;
  gender?: string;
  qualifications?: string;
  faculty?: string;
  hospital?: string;
  description?: string;
  image?: Image;
  createdAt?: string;
  updatedAt?: string;
  published_at?: string;
}
