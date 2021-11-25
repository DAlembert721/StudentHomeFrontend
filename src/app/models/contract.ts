import {ContractState} from "./contract-state.enum";

export interface Contract {
  id: number;
  description: string;
  amount: number;
  state: ContractState;
  createdAt: Date;
  firstNameStudent: string;
  lastNameStudent: string;
  studentId: number;
  propertyId: number;
}
