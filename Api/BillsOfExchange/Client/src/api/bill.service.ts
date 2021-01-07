import { BaseService } from './base.service';
import { IBill } from '../store/bill';
import { IBillDetail } from '../store/billdetail';


class BillService extends BaseService {
    private static _service: BillService;
    private static _controllerName: string = 'BillsOfExchange';

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): BillService {
        return this._service || (this._service = new this(this._controllerName));
    }

    public async getBillsAsync(page: number): Promise<IBill[]> {
        const { data } = await this.$http.get<IBill[]>(`Get?page=${page}`);
        return data;
    }

    public async getBillDetailAsync(billId: number): Promise<IBillDetail> {
        const { data } = await this.$http.get<IBillDetail>(`Detail?billId=${billId}`);
        return data;
    }
}

export const BillApi = BillService.Instance;