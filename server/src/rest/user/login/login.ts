import {RESTHost} from '@skylixgh/luxjs-server';

/**
 * Login handler service
 * @param rest REST server
 */
export default function init(rest: RESTHost) {
    rest.on('get', (pathName, connection) => {
        if (pathName == 'user/login') {
            connection.sendJSON({
                authentication: {
                    token1: 'abc',
                    token2: 'xyz',
                },
            });
        }
    });
}
