import {terminal, TCPHost, RESTHost} from '@skylixgh/luxjs-server';
import initRest, {routesRest} from './rest/init';
import {MongoClient} from 'mongodb';
import mongoURIBuilder from 'mongo-uri-builder';
import config from '../app.config';

let connectUrl;

if (typeof config.db == 'string') {
    connectUrl = config.db;
} else {
    connectUrl = mongoURIBuilder({
        ...config.db,
    });
}

const db = new MongoClient(connectUrl);

const failedToStart = () => {
    terminal.error(
        'Failed to boot this server, please check the debug logs for more info',
    );
    process.exit();
};

const afterDBReady = () => {
    terminal.info('Starting TCP based API server and REST based API server');

    const tcp = new TCPHost({
        port: 1790,
        host: '0.0.0.0',
    });

    const rest = new RESTHost({
        port: 9017,
        host: '0.0.0.0',
        routes: {
            get: routesRest.get,
            post: routesRest.post,
        },
    });

    initRest(rest);

    rest.start().then(() => {
        terminal.success('REST based API server is ready');
    });

    tcp.start().then(() => {
        terminal.success('TCP based API server is ready');
    });
};

terminal.info('Connecting to MongoDB Database instance');

db.connect()
    .then(() => {
        terminal.success('Successfully connected to MongoDB instance');
        afterDBReady();
    })
    .catch((error) => {
        terminal.error(error);
        terminal.error('Failed to connect to MongoDB server');
        failedToStart();
    });

export {db};
