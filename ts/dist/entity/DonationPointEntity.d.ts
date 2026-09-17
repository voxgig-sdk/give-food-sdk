import { GiveFoodEntityBase } from '../GiveFoodEntityBase';
import type { GiveFoodSDK } from '../GiveFoodSDK';
import type { Control } from '../types';
import type { DonationPoint, DonationPointLoadMatch, DonationPointListMatch } from '../GiveFoodTypes';
declare class DonationPointEntity extends GiveFoodEntityBase<DonationPoint> {
    constructor(client: GiveFoodSDK, entopts: any);
    make(this: DonationPointEntity): DonationPointEntity;
    load(this: any, reqmatch?: DonationPointLoadMatch, ctrl?: Control): Promise<DonationPointEntity>;
    list(this: any, reqmatch?: DonationPointListMatch, ctrl?: Control): Promise<DonationPointEntity[]>;
}
export { DonationPointEntity };
