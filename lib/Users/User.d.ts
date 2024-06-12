import { UserApiTypeWithoutAttributes } from "../Types/User";
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
//# sourceMappingURL=User.d.ts.map