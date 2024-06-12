import { AllocationType } from "../../Types/Allocation";
import { ServerType } from "../../Types/Server";
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
//# sourceMappingURL=Allocation.d.ts.map