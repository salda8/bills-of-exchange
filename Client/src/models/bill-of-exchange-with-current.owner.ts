import { BillOfExchange } from "./bill-of-exchange";

export interface BillOfExchangeWithCurrentOwner extends BillOfExchange {
  ownerName: string;
  ownerId: number;
}
