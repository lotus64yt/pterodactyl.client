import { ServerType } from "../../Types/Server";
import { DatabaseType } from "../../Types/Database";
/**
 * Database
 * Class for manage a database of a server
 * @public
 */
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
/**
 * Databases Manager
 * Class for manages the databases of a server
 * @public
 */
export declare class DatabasesManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<DatabaseType>;
    create(name: string, remote?: string): Promise<Database>;
}
//# sourceMappingURL=index.d.ts.map