import { IGroupSafe } from './groups.interfaces';
import { IUserData } from './user.interfaces';

export interface IPost {
  id: number;
  owner: IUserData;
  content: string;
  date_posted: string;
  group: IGroupSafe;
  file: any;
  image: any;
}
