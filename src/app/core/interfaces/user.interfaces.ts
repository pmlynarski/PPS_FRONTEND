export interface ILoginData {
  username: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface IUserData {
  image: string;
  email: string;
  first_name: string;
  last_name: string;
  id?: number;
}
