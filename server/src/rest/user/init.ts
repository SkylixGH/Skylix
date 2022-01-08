import { RESTHost } from "@skylixgh/luxjs-server";
import login from "./login/login";

/**
 * Initialize account handler
 * @param rest REST server
 */
export default function init(rest: RESTHost) {
    login(rest);
}

const userRoutes = {
    get: [],
    post: ["user/login", "user/create", "user/resetPassword"],
};

export { userRoutes };
