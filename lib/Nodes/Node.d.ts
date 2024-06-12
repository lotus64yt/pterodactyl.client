import { NodeType } from "../Types/Node";
import { NodeAllocationsManager } from "./Allocations/index";
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
    /**
     * Required: Set the node name
     * @param name - The name of the node
     */
    edit(data: any): Promise<Node>;
    delete(): Promise<boolean>;
    get allocations(): typeof NodeAllocationsManager.prototype;
}
//# sourceMappingURL=Node.d.ts.map