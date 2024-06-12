import { ServerType } from "../../Types/Server";
import { BackupType } from "../../Types/Backup";
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
//# sourceMappingURL=Backup.d.ts.map