import { utils } from "@skylixgh/luxjs-server";
import { MongoUriBuilderConfig } from "mongo-uri-builder";

/**
 * Add type declarations to your config
 * @param config Your config
 * @returns Your config
 */
export function defineConfig(config: Partial<AppConfig>): AppConfig {
    return utils.mergeObject<AppConfig, Partial<AppConfig>>({
        db: {
            host: "localhost",
            port: 27017
        },
        rest: {
            port: 9017,
            host: "0.0.0.0"
        },
        tcp: {
            port: 1790,
            host: "localhost"
        } 
    }, config);
}

export interface AppConfig {
    /**
     * Your DB configuration
     */
    db: Partial<MongoUriBuilderConfig>;

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
    }

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
    }
}