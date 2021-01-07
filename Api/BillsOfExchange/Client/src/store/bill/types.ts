export type IBill = Readonly<{
    id: number;
    drawerId: number;
    beneficaryId: number;
    amount: number;
}>;

export type IBillState = Readonly<{
    isLoading: boolean;
    page?: number;
    bills: IBill[];
}>;

export enum BillActionType {
    REQUEST = 'bill/fetch',
    RECEIVE = 'bill/receive',
    RESET_STATE = 'bill/resetState'
};