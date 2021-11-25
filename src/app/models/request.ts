import {RequestState} from './request-state.enum';

export interface Request {
  id: number;
  content: string;
  state: RequestState;
  createdAt: Date;
  firstNameStudent: string;
  lastNameStudent: string;
  firstNameLandlord: string;
  lastNameLandlord: string;
}
