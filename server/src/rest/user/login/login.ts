import {
    RESTHost,
    RESTHostConnectionErrors,
    terminal,
} from "@skylixgh/luxjs-server";
import { UserInstance } from "@skylixgh/skylix-meta";
import { db } from "../../../main";
import Controller from './../Controller';
import { WithId } from "mongodb";

/**
 * Get a user
 * @returns A user controller
 */
function getUser(): Promise<Controller> {
    return new Promise((resolve, reject) => {
        const userCollection = db.collection("Users");

        userCollection
            .findOne<WithId<UserInstance>>()
            .then((userDocument) => {
                resolve(new Controller(userDocument!));
            })
            .catch(() => {
                reject();
            });
    });
}

/**
 * Login handler service
 * @param rest REST server
 */
export default function init(rest: RESTHost) {
    rest.on("post", (pathName, connection) => {
        if (pathName == "user/login") {
            getUser()
                .then((userController) => {
                    connection.sendJSON(userController).catch(() => {});
                })
                .catch(() => {
                    connection.sendJSON({
                        error: {
                            code: -1,
                            reason: "Account does not exist",
                        },
                    });
                });
        }
    });
}
