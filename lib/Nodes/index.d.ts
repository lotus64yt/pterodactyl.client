import { NodeType } from "../Types/Node";
import { NodeBuilder } from "src/Builders";
import { NodeAllocationsManager } from "./Allocations/index";
/**
 * Node
 * Node object
 * @public
 */
export declare class Node {
    apiKey: string;
    panelURL: string;
    id: number;
    uuid: string;
    public: boolean;
    name: string;
    description: string;
    locationID: number;
    fqdn: string;
    scheme: string;
    behindProxy: boolean;
    maintenanceMode: boolean;
    memory: number;
    memoryOverallocate: number;
    disk: number;
    diskOverallocate: number;
    uploadSize: number;
    daemonListen: number;
    daemonSFTP: number;
    daemonBase: string;
    createdAt: string;
    updatedAt: string;
    constructor(data: NodeType, apiKey: string, panelURL: string);
    edit(data: any): Promise<Node>;
    delete(): Promise<boolean>;
    get allocations(): typeof NodeAllocationsManager.prototype;
}
/**
 * NodesManager
 * Class to manage nodes
 * @public
 */
export declare class NodesManager {
    apiKey: string;
    panelURL: string;
    constructor(apiKey: string, panelURL: string);
    fetchAll(): Promise<Node[]>;
    fetch(id: number): Promise<Node>;
    create(data: NodeBuilder): Promise<Node>;
}
//# sourceMappingURL=index.d.ts.map