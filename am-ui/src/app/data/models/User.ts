import {Role} from './Role';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  token?: string;
}
