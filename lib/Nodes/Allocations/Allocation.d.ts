import { NodeAllocationType } from "../../Types/NodeAllocation";
export declare class NodeAllocation {
    id: number;
    ip: string;
    alias: null | string;
    port: number;
    notes: string | null;
    assigned: boolean;
    apiKey: string;
    panelURL: string;
    nodeID: number;
    constructor(data: NodeAllocationType, apiKey: string, panelURL: string, nodeId: number);
    delete(): Promise<boolean>;
}
//# sourceMappingURL=Allocation.d.ts.map