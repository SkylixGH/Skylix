import { ObjectId } from "mongodb";

export default interface Result {
    /**
     * First token
     */
    token1: string;

    /**
     * Second token
     */
    token2: string;

    /**
     * User ID
     */
    _id: ObjectId;
}
