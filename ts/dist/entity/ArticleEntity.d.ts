import { GiveFoodEntityBase } from '../GiveFoodEntityBase';
import type { GiveFoodSDK } from '../GiveFoodSDK';
import type { Control } from '../types';
import type { Article, ArticleListMatch } from '../GiveFoodTypes';
declare class ArticleEntity extends GiveFoodEntityBase<Article> {
    constructor(client: GiveFoodSDK, entopts: any);
    make(this: ArticleEntity): ArticleEntity;
    list(this: any, reqmatch?: ArticleListMatch, ctrl?: Control): Promise<ArticleEntity[]>;
}
export { ArticleEntity };
