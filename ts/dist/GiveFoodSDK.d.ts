import { ArticleEntity } from './entity/ArticleEntity';
import { DonationPointEntity } from './entity/DonationPointEntity';
import { FoodBankEntity } from './entity/FoodBankEntity';
import { ItemEntity } from './entity/ItemEntity';
export type * from './GiveFoodTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GiveFoodEntityBase } from './GiveFoodEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class GiveFoodSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Article(entopts?: Record<string, any>): ArticleEntity;
    DonationPoint(entopts?: Record<string, any>): DonationPointEntity;
    FoodBank(entopts?: Record<string, any>): FoodBankEntity;
    Item(entopts?: Record<string, any>): ItemEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GiveFoodSDK;
    tester(testopts?: any, sdkopts?: any): GiveFoodSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GiveFoodSDK;
export { stdutil, config, BaseFeature, GiveFoodEntityBase, GiveFoodSDK, SDK, };
export type { DirectResult };
