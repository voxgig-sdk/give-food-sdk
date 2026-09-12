import { GiveFoodEntityBase } from '../GiveFoodEntityBase';
import type { GiveFoodSDK } from '../GiveFoodSDK';
import type { Control } from '../types';
import type { Foodbank, FoodbankLoadMatch, FoodbankListMatch } from '../GiveFoodTypes';
declare class FoodbankEntity extends GiveFoodEntityBase<Foodbank> {
    constructor(client: GiveFoodSDK, entopts: any);
    make(this: FoodbankEntity): FoodbankEntity;
    load(this: any, reqmatch?: FoodbankLoadMatch, ctrl?: Control): Promise<FoodbankEntity>;
    list(this: any, reqmatch?: FoodbankListMatch, ctrl?: Control): Promise<FoodbankEntity[]>;
}
export { FoodbankEntity };
