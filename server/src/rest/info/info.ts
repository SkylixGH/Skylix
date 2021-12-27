import { RESTHost } from "@skylixgh/reflux-server";
import pkg from "../../../package.json";

export default function init(rest: RESTHost) {
    rest.on("get", (pathName, connection) => {
        if (pathName == "info") {
            connection.sendJSON({
                version: pkg.version
            });
        }
    });
}