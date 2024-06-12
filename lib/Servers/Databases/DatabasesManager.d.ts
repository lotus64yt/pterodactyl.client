import { Database } from "./Database";
import { DatabaseType } from "../../Types/Database";
import { ServerType } from "../../Types/Server";
export declare class DatabasesManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<DatabaseType>;
    create(name: string, remote?: string): Promise<Database>;
}
//# sourceMappingURL=DatabasesManager.d.ts.map