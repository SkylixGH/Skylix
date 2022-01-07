import { RESTHost } from "@skylixgh/luxjs-server";
import info from "./info/info";

export default function init(rest: RESTHost) {
    info(rest);
}

const routesRest = {
    get: [ "info" ],
    post: []
}

export { routesRest };
