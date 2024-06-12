import { ServerUserType } from "../../Types/ServerUser";
import { ServerType } from "../../Types/Server";
/**
 * Server User
 * A user of a server
 * @public
 */
export declare class ServerUser {
    server: ServerType;
    type: string;
    uuid: string;
    username: string;
    email: string;
    image: string;
    a2f: boolean;
    created: string;
    permissions: string[];
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, data: ServerUserType, apiKey: string, panelURL: string, appKey: string);
    edit(permissions: string[]): Promise<ServerUser>;
    remove(): Promise<boolean>;
}
/**
 * Server Users Manager
 * Class for manage the server's users
 * @public
 */
export declare class ServerUsersManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<ServerUser[]>;
    fetch(uuid: string): Promise<ServerUser>;
    add(email: string, permissions: string[]): Promise<ServerUser>;
}
//# sourceMappingURL=index.d.ts.map