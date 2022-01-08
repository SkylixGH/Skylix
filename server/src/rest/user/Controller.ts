import {UserInstance} from '@skylixgh/skylix-meta/src/main';
import {WithId} from 'mongodb';

/**
 * A user account controller
 */
export default class Controller {
    /**
     * The user account instance
     */
    public user: WithId<UserInstance>;

    /**
     * Create a user controller to run tasks
     * @param user User instance
     */
    public constructor(user: WithId<UserInstance>) {
        this.user = user;
    }
}
