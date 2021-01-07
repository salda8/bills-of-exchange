export type IBillDetail = Readonly<{
    id: number;
    drawerName: string;
}>;



export type IBillDetailState = Readonly<{
    billDetail: IBillDetail;
    id: number;
}>;

export enum BillDetailActionType {
    REQUEST = 'billdetail/fetch',
    RECEIVE = 'billdetail/receive',
    RESET_STATE = 'billdetail/resetState'
};
