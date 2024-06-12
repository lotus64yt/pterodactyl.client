import { FilesManager } from "./Files/FilesManager";
import { File } from "./Files/File";
import { VariablesManager } from "./Variables/VariablesManager";
import { Variable } from "./Variables/Variable";
import { BackupsManager } from "./Backups/BackupsManager";
import { Backup } from "./Backups/Backup";
import { DatabasesManager } from "./Databases/DatabasesManager";
import { Database } from "./Databases/Database";
import { AllocationsManager } from "./Network/AllocationsManager";
import { Allocation } from "./Network/Allocation";
import { ServerUserManager } from "./ServerUsers/ServerUsersManager";
import { ServerType } from "../Types/Server";
/**
 *  Server
 * Server class
 */
declare class Server {
    apiKey: string;
    panelURL: string;
    data: any;
    appKey: string | null;
    type: string;
    name: string;
    id: number;
    externalId: string | undefined;
    uuid: string;
    identifier: string;
    description: string;
    suspended: boolean;
    limits: object;
    constructor(data: ServerType, apiKey: string, panelURL: string, appKey?: string | null);
    suspend(): Promise<boolean>;
    unsuspend(): Promise<boolean>;
    delete(): Promise<boolean>;
    reinstall(): Promise<boolean>;
    editDetails(data: {
        "name": string;
        "user": number;
        "external_id": string;
        "description": string;
    }): Promise<Server>;
    editBuild(data: {
        "allocation": number;
        "memory": number;
        "swap": number;
        "disk": number;
        "io": number;
        "cpu": number;
        "threads": null | number;
        "feature_limits": {
            "databases": number;
            "allocations": number;
            "backups": number;
        };
    }): Promise<Server>;
    start(): Promise<boolean>;
    stop(): Promise<boolean>;
    kill(): Promise<boolean>;
    restart(): Promise<boolean>;
    sendCommand(command: string): Promise<boolean>;
    get files(): FilesManager;
    get variables(): VariablesManager;
    get backups(): BackupsManager;
    get databases(): DatabasesManager;
    get allocations(): AllocationsManager;
    get users(): ServerUserManager;
}
export { Server, FilesManager, File, VariablesManager, Variable, BackupsManager, Backup, DatabasesManager, Database, AllocationsManager, Allocation };
//# sourceMappingURL=Server.d.ts.map