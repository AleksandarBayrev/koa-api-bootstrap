import koa from 'koa';
import Router from 'koa-router';
import { contentTypes } from '../../constants';
import { AppContext, AppState } from '../../types';

export const indexRouteGet = (router: Router) => {
    router.get('/', async (context: koa.ParameterizedContext<AppState, AppContext>, next) => {
        context.set('Content-Type', contentTypes.json);
        context.body = {
            message: 'Hello, World! This is the GET route.'
        };
    });
}