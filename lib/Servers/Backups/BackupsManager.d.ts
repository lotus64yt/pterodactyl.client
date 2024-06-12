import { Backup } from "./Backup";
import { ServerType } from "../../Types/Server";
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
//# sourceMappingURL=BackupsManager.d.ts.map