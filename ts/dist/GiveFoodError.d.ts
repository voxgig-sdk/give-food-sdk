import { Context } from './Context';
declare class GiveFoodError extends Error {
    isGiveFoodError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { GiveFoodError };
