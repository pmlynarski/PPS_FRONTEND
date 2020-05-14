import { IUserData } from './user.interfaces';

export interface IComment {
  id: number;
  owner: IUserData;
  content: string;
  date_commented: string;
  file: File;
  post: number;
}
