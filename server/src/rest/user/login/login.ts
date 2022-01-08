import {
    RESTHost,
} from "@skylixgh/luxjs-server";
import { UserInstance, UserLoginErrors, UserLoginRequestForServer } from "@skylixgh/skylix-meta/src/main";
import { db } from "../../../main";
import Controller from "./../Controller";
import { WithId } from "mongodb";

/**
 * Get a user
 * @returns A user controller
 */
function getUser(targetEmailUserName: any): Promise<Controller> {
    return new Promise((resolve, reject) => {
        const userCollection = db.collection("Users");

        let targetName: Partial<UserInstance> = {};
        if (targetEmailUserName.includes("@")) {
            targetName["primaryEmail"] == targetEmailUserName;
        } else {
            targetName["userName"] == targetEmailUserName;
        }

        console.log(targetName);

        userCollection
            .findOne<WithId<UserInstance>>({
                ...targetName
            } as Partial<UserInstance>)
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
    rest.on<UserLoginRequestForServer, any>("post", (pathName, connection) => {
        if (pathName == "user/login") {
            console.log(connection.body.userNameEmail)
            getUser(connection.body)
                .then((userController) => {
                    connection.sendJSON(userController).catch(() => {});
                })
                .catch(() => {
                    connection.sendJSON({
                        error: UserLoginErrors.accountNotFound
                    });
                });
        }
    });
}
