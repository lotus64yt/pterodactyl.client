import { ServerType } from "../Types/Server";
import { ServerBuilder } from "../Builders/index";
import { FilesManager } from "./Files";
import { VariablesManager } from "./Variables";
import { BackupsManager } from "./Backups";
import { DatabasesManager } from "./Databases";
import { AllocationsManager } from "./Network";
import { ServerUsersManager } from "./ServerUsers";
/**
 *  Server
 * Server class
 */
export declare class Server {
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
    get users(): ServerUsersManager;
}
/**
 *  ServersManager
 * Class to manage servers
 * @public
 */
export declare class ServersManager {
    apiKey: string;
    panelURL: string;
    appKey: string | null;
    constructor(api: string, url: string, appKey?: string | null);
    fetchAll(): Promise<ServerType[]>;
    /**
     *
     * @param id - Server ID
     */
    fetch(id: number): Promise<Server>;
    /**
     *
     * @param data - Server data
     */
    create(data: typeof ServerBuilder): Promise<Server>;
}
//# sourceMappingURL=index.d.ts.map