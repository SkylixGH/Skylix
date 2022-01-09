import {
    RESTHost,
} from "@skylixgh/luxjs-server";
import { UserInstance, UserLoginErrors, UserLoginRequestForServer, UserLoginResult } from "@skylixgh/skylix-meta/src/main";
import { db } from "../../../main";
import Controller from "./../Controller";
import { WithId } from "mongodb";
import bcrypt from "bcrypt";

/**
 * Get a user
 * @returns A user controller
 */
function getUser(targetEmailUserName: any, password = ""): Promise<Controller> {
    return new Promise((resolve, reject) => {
        const userCollection = db.collection("Users");

        let targetName: Partial<UserInstance> = {};
        if (targetEmailUserName.includes("@")) {
            targetName["primaryEmail"] == targetEmailUserName;
        } else {
            targetName["userName"] == targetEmailUserName;
        }

        userCollection
            .findOne<WithId<UserInstance>>({
                ...targetName
            } as Partial<UserInstance>)
            .then((userDocument) => {
                bcrypt.compare(password, userDocument?.passwordToken1!).then((passwordToken1Valid) => {                    
                    if (passwordToken1Valid) {
                        bcrypt.compare(password, userDocument?.passwordToken2!).then((passwordToken2Valid) => {
                            if (passwordToken2Valid) {
                                resolve(new Controller(userDocument!));
                                return;
                            }

                            reject(UserLoginErrors.invalidPassword);
                        });
                        return;
                    }

                    reject(UserLoginErrors.invalidPassword);
                });
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
                .catch((errorCode) => {
                    connection.sendJSON({ 
                        error: errorCode
                    });
                });
        } 
    });
} 
