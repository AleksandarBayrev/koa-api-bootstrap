import { DefaultContext } from 'koa';
import { UserModel } from './UserModel';

export interface AppContext extends DefaultContext {
    user?: UserModel;
}