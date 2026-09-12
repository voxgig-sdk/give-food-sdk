import { ArticleEntity } from './entity/ArticleEntity';
import { DonationpointEntity } from './entity/DonationpointEntity';
import { FoodbankEntity } from './entity/FoodbankEntity';
import { ItemEntity } from './entity/ItemEntity';
export type * from './GiveFoodTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GiveFoodEntityBase } from './GiveFoodEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
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
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Article(entopts?: Record<string, any>): ArticleEntity;
    Donationpoint(entopts?: Record<string, any>): DonationpointEntity;
    Foodbank(entopts?: Record<string, any>): FoodbankEntity;
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
