import type { IUser } from './user';

export interface IAuthResponse {
  token: string;
  userData: IUser;
}
