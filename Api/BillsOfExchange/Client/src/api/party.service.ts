import { BaseService } from './base.service';
import { IParty } from '../store/party';

class PartyService extends BaseService {
    private static _service: PartyService;
    private static _controllerName: string = 'Party';

    private constructor(controllerName: string) {
        super(controllerName);
    }

    public static get Instance(): PartyService {
        return this._service || (this._service = new this(this._controllerName));
    }

    public async getPartiesAsync(page: number): Promise<IParty[]> {
        const { data } = await this.$http.get<IParty[]>(`Get?page=${page}`);
        return data;
    }
}

export const PartyApi = PartyService.Instance;
