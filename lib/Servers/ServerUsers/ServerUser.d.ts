import { ServerUserType } from "../../Types/ServerUser";
import { ServerType } from "../../Types/Server";
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
//# sourceMappingURL=ServerUser.d.ts.map