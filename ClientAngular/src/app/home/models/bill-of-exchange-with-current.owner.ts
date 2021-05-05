import { BillsOfExchange } from './bills-of-exchange';

export interface BillOfExchangeWithCurrentOwner extends BillsOfExchange {
  ownerName: string;
  ownerId: number;
}
