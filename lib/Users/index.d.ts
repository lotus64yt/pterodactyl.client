import { UserApiTypeWithoutAttributes, UserType } from "../Types/User";
/**
 *  User
 * User class
 */
export declare class User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    language: string;
    rootAdmin: boolean;
    externalId: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
    a2f: boolean;
    apiKey: string;
    panelURL: string;
    constructor(data: UserApiTypeWithoutAttributes, apiKey: string, panelURL: string);
    delete(): Promise<boolean>;
    /**
     *
     * @param data - User data
     */
    edit(data: {
        "email": string;
        "username": string;
        "first_name": string;
        "last_name": string;
        "language": string;
        "password": string;
    }): Promise<User>;
}
/**
 *  UsersManager
 * Class to manage users
 * @public
 */
export declare class UsersManager {
    apiKey: string;
    panelURL: string;
    constructor(apiKey: string, panelURL: string);
    fetchAll(): Promise<User[]>;
    /**
     *
     * @param id - User ID
     */
    fetch(id: number): Promise<User>;
    /**
     *
     * @param email - User email
     */
    fetchByEmail(email: string): Promise<UserType[] | Error>;
    /**
     *
     * @param user - User data
     */
    create(user: {
        email: string;
        username: string;
        firstName: string;
        lastName: string;
    }): Promise<User>;
}
//# sourceMappingURL=index.d.ts.map