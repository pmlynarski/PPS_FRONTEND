import { IUserData } from './user.interfaces';

export interface IGroupSafe {
  id: number;
  name: string;
}

export interface IGroupFull {
  id: number;
  name: string;
  owner: IUserData;
  members: IUserData[];
  membersCount: number;
}
