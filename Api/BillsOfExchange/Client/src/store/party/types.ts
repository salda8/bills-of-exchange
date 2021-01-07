export type IParty = Readonly<{
    id: number;
    name: string;
}>;

export type IPartyState = Readonly<{
  isLoading: boolean;
  page?: number;
  parties: IParty[];
}>;

export enum PartyActionType {
  REQUEST = 'party/fetch',
  RECEIVE = 'party/receive',
  RESET_STATE = 'party/resetState'
};