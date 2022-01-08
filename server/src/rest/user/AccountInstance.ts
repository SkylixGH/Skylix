export interface User {
    /**
     * Account display name
     */
    displayName: string;

    /**
     * Account user name
     */
    userName: string;

    /**
     * The primary email address for the account
     */
    primaryEmail: string;

    /**
     * The first password token
     */
    passwordToken1: string;

    /**
     * The second password token
     */
    passwordToken2: string;

    /**
     * All alternative email addresses
     */
    alternateEmails: string[];

    /**
     * The first account token
     */
    token1: string;

    /**
     * The second account token
     */
    token2: string;
}
