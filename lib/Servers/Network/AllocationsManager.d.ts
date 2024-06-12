import { Allocation } from "./Allocation";
import { ServerType } from "../../Types/Server";
export declare class AllocationsManager {
    server: ServerType;
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<Allocation[]>;
    assign(): Promise<Allocation>;
}
//# sourceMappingURL=AllocationsManager.d.ts.map