import { ServerType } from "../../Types/Server";
import { ServerUser } from "./ServerUser";
export declare class ServerUserManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<ServerUser[]>;
    fetch(uuid: string): Promise<ServerUser>;
    add(email: string, permissions: string[]): Promise<ServerUser>;
}
//# sourceMappingURL=ServerUsersManager.d.ts.map