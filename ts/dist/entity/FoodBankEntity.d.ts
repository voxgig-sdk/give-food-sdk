import { GiveFoodEntityBase } from '../GiveFoodEntityBase';
import type { GiveFoodSDK } from '../GiveFoodSDK';
import type { Control } from '../types';
import type { FoodBank, FoodBankLoadMatch, FoodBankListMatch } from '../GiveFoodTypes';
declare class FoodBankEntity extends GiveFoodEntityBase<FoodBank> {
    constructor(client: GiveFoodSDK, entopts: any);
    make(this: FoodBankEntity): FoodBankEntity;
    load(this: any, reqmatch?: FoodBankLoadMatch, ctrl?: Control): Promise<FoodBankEntity>;
    list(this: any, reqmatch?: FoodBankListMatch, ctrl?: Control): Promise<FoodBankEntity[]>;
}
export { FoodBankEntity };
