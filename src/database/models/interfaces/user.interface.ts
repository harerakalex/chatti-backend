export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  displayName?: string;
  bio?: string;
  verified?: boolean;
}
