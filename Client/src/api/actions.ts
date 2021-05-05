import { RequestAction } from "@redux-requests/core";
import {
  BillOfExchange,
  BillOfExchangeWithCurrentOwner,
  Endorsement,
  PagedResult,
  PartyDto,
} from "../models";
import {
  GET_BILL,
  GET_BILLS,
  GET_ENDORSEMENTS_FOR_BILL,
  GET_ISSUED_BILLS_BY,
  GET_OWNED_BILLS_BY,
  GET_PARTIES,
  GET_PARTY,
} from "./constants";

export function fetchBills(
  take: number,
  skip: number
): RequestAction<PagedResult<BillOfExchange>> {
  return {
    type: GET_BILLS,
    request: { url: `/BillsOfExchange`, params: { take, skip } },
  };
}

export function fetchBill(
  id: number
): RequestAction<BillOfExchangeWithCurrentOwner> {
  return {
    type: GET_BILL,
    request: { url: `/BillsOfExchange/${id}` },
  };
}

export function fetchOwnedBillsBy(
  ownerId: number
): RequestAction<BillOfExchange[]> {
  return {
    type: GET_OWNED_BILLS_BY,
    request: { url: `/BillsOfExchange/owned-by`, params: { ownerId } },
  };
}

export function fetchIssuedBillsBy(
  ownerId: number
): RequestAction<BillOfExchange[]> {
  return {
    type: GET_ISSUED_BILLS_BY,
    request: { url: `/BillsOfExchange/issued-by`, params: { ownerId } },
  };
}

export function fetchEndorsementsForBill(
  billId: number
): RequestAction<Endorsement[]> {
  return {
    type: GET_ENDORSEMENTS_FOR_BILL,
    request: { url: `/Endorsements`, params: { billId } },
  };
}

export function fetchParty(id: number): RequestAction<PartyDto> {
  return {
    type: GET_PARTY,
    request: { url: `/Party/${id}` },
  };
}

export function fetchParties(
  take: number,
  skip: number
): RequestAction<PagedResult<PartyDto>> {
  return {
    type: GET_PARTIES,
    request: { url: `/Party`, params: { take, skip } },
  };
}
