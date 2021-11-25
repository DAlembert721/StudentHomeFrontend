export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  roles: [];
  accessToken: string;
  tokenType: string;
}
