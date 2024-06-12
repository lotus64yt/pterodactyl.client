import { ServerType } from "../../Types/Server";
import { BackupType } from "../../Types/Backup";
/**
 * Backup
 * Class to manage backups
 * @public
 */
export declare class Backup {
    server: ServerType;
    type: string;
    name: string;
    uuid: string;
    ignoredFiles: string[];
    sha256Hash: string;
    bytes: number;
    createdAt: string;
    completedAt: string;
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, data: BackupType, apiKey: string, panelURL: string, appKey: string);
    generateDownloadUrl(): Promise<string | Error>;
    delete(): Promise<boolean | Error>;
}
/**
 * Backups Manager
 * Class for manage backups of a server
 * @public
 */
export declare class BackupsManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<Backup[] | Error>;
    fetch(uuid: string): Promise<Backup | Error>;
    create(): Promise<Backup | Error>;
}
//# sourceMappingURL=index.d.ts.map