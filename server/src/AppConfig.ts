import { utils } from "@skylixgh/luxjs-server";
import { MongoUriBuilderConfig } from "mongo-uri-builder";

/**
 * Add type declarations to your config
 * @param config Your config
 * @return Your config
 */
export function defineConfig(config: Partial<AppConfig>): AppConfig {
    return utils.mergeObject<AppConfig, Partial<AppConfig>>(
        {
            db: {
                host: "localhost",
                port: 27017,
            },
            dbName: "SkylixDev",
            rest: {
                port: 9017,
                host: "0.0.0.0",
            },
            tcp: {
                port: 1790,
                host: "localhost",
            },
        },
        config
    );
}

export interface AppConfig {
    /**
     * Your DB configuration, use a string for a full connection url
     */
    db: Partial<MongoUriBuilderConfig> | string;

    /**
     * The name of the database
     */
    dbName: string;

    /**
     * REST API server's settings
     */
    rest: {
        /**
         * REST API port
         */
        port: number;

        /**
         * REST API host
         */
        host: string;
    };

    /**
     * TCP API server's settings
     */
    tcp: {
        /**
         * TCP API port
         */
        port: number;

        /**
         * TCP API host
         */
        host: string;
    };
}
