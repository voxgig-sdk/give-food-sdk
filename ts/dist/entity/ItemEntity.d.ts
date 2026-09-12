import { GiveFoodEntityBase } from '../GiveFoodEntityBase';
import type { GiveFoodSDK } from '../GiveFoodSDK';
import type { Control } from '../types';
import type { Item, ItemListMatch } from '../GiveFoodTypes';
declare class ItemEntity extends GiveFoodEntityBase<Item> {
    constructor(client: GiveFoodSDK, entopts: any);
    make(this: ItemEntity): ItemEntity;
    list(this: any, reqmatch?: ItemListMatch, ctrl?: Control): Promise<ItemEntity[]>;
}
export { ItemEntity };
