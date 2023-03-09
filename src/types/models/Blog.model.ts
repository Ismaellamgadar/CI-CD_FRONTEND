import { Role } from './Role.model';
import { User } from './User.model';

export type Blog = {
  id: string;
  title: string;
  text: string;
  author: User;
  category: string;
};