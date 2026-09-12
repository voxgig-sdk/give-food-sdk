import { GiveFoodEntityBase } from '../GiveFoodEntityBase';
import type { GiveFoodSDK } from '../GiveFoodSDK';
import type { Control } from '../types';
import type { Donationpoint, DonationpointLoadMatch, DonationpointListMatch } from '../GiveFoodTypes';
declare class DonationpointEntity extends GiveFoodEntityBase<Donationpoint> {
    constructor(client: GiveFoodSDK, entopts: any);
    make(this: DonationpointEntity): DonationpointEntity;
    load(this: any, reqmatch?: DonationpointLoadMatch, ctrl?: Control): Promise<DonationpointEntity>;
    list(this: any, reqmatch?: DonationpointListMatch, ctrl?: Control): Promise<DonationpointEntity[]>;
}
export { DonationpointEntity };
