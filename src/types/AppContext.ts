import { DefaultContext } from 'koa';

export interface AppContext extends DefaultContext {
    user?: {id: string, username: string};
}