import { Doctor } from '../doctors/Doctor.model';
import { Post } from '../posts/Post.model';
import { Service } from '../services/Service.model';

export class Data {
  services: Service[];
  features: Post[];
  qna: Post[];
  companies: Post[];
  doctors: Doctor[];
  news: Post[];
  introduction: Post[];
}