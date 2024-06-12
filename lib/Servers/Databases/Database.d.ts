import { ServerType } from "../../Types/Server";
import { DatabaseType } from "../../Types/Database";
export declare class Database {
    server: ServerType;
    type: string;
    id: number;
    adress: string;
    port: number;
    name: string;
    username: string;
    connectionFrom: string;
    maxConnections: number;
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, data: DatabaseType, apiKey: string, panelURL: string, appKey: string);
    rotatePassword(): Promise<string>;
    delete(): Promise<boolean>;
}
//# sourceMappingURL=Database.d.ts.map