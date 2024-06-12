import { NodeAllocationType } from "../../Types/NodeAllocation";
/**
 * Node Allocation
 * Node Allocation Object
 * @public
 */
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
/**
 * Node Allocations Manager
 * Manage the Allocations of a Node
 * @public
 */
export declare class NodeAllocationsManager {
    apiKey: string;
    panelURL: string;
    nodeID: number;
    constructor(apiKey: string, panelURL: string, nodeID: number);
    fetchAll(): Promise<NodeAllocation[]>;
    create(ip: string, port: string[]): Promise<boolean>;
    fetchByPort(port: number): Promise<NodeAllocation>;
}
//# sourceMappingURL=index.d.ts.map