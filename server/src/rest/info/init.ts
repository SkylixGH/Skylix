import { RESTHost } from "@skylixgh/luxjs-server";
import pkg from "../../../package.json";

/**
 * Initialize info
 * @param rest REST server
 */
export default function init(rest: RESTHost) {
    rest.on("get", (pathName, connection) => {
        if (pathName == "info/version") {
            connection.sendJSON({
                version: pkg.version,
            });
        }
    });
}

const infoRoutes = {
    get: ["info/version"],
    post: [],
};

export { infoRoutes };
