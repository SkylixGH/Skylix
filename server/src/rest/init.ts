import {RESTHost} from '@skylixgh/luxjs-server';
import info, {infoRoutes} from './info/init';
import user, {userRoutes} from './user/init';

/**
 * Initialize all REST API services
 * @param rest REST server
 */
export default function init(rest: RESTHost) {
    info(rest);
    user(rest);
}

const routesRest = {
    get: [...infoRoutes.get, ...userRoutes.get],
    post: [...infoRoutes.post, ...userRoutes.post],
};

export {routesRest};
