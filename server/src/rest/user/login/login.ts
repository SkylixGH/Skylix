import {
    RESTHost,
} from "@skylixgh/luxjs-server";
import { UserInstance, UserLoginErrors, UserLoginRequestForServer, UserLoginResult } from "@skylixgh/skylix-meta/src/main";
import { db } from "../../../main";
import Controller from "./../Controller";
import { WithId } from "mongodb";

/**
 * Get a user
 * @returns A user controller
 */
function getUser(targetEmailUserName: any, password: string): Promise<Controller> {
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
            getUser(connection.body.userNameEmail, connection.body.password)
                .then((userController) => {
                    connection.sendJSON<UserLoginResult>({
                        token1: userController.user.token1,
                        token2: userController.user.token2,
                        _id: userController.user._id
                    }).catch(() => {});
                })
                .catch(() => {
                    connection.sendJSON({ 
                        error: UserLoginErrors.accountNotFound
                    });
                });
        } 
    });
} 
