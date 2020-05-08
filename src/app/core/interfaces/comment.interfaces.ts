import { IUserData } from './user.interfaces';

export interface IComment {
    id: number;
    owner: IUserData;
    content: string;
    date_posted: string;
    file: File;
  }