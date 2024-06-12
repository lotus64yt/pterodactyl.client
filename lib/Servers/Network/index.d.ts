import { AllocationType } from "../../Types/Allocation";
import { ServerType } from "../../Types/Server";
/**
 * Allocation
 * Object of an server's allocation
 */
export declare class Allocation {
    server: ServerType;
    type: string;
    id: number;
    ip: string;
    ipAlias: string | null;
    port: number;
    notes: string | null;
    isDefault: boolean;
    apiKey: string;
    panelURL: string;
    appKey: string | null;
    constructor(server: ServerType, data: AllocationType, apiKey: string, panelURL: string, appKey: string);
    delete(): Promise<boolean>;
    setNotes(notes: string): Promise<boolean>;
    setPrimary(): Promise<boolean>;
}
/**
 * Allocations Manager
 * Class for manage the allocations of a server
 * @public
 */
export declare class AllocationsManager {
    server: ServerType;
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<Allocation[]>;
    assign(): Promise<Allocation>;
}
//# sourceMappingURL=index.d.ts.map