import { NodeAllocationType } from "../../Types/NodeAllocation";

/**
 * Node Allocation
 * Node Allocation Object
 * @public
 */

export class NodeAllocation {
    public id: number;
    public ip: string;
    public alias: null | string;
    public port: number;
    public notes: string | null;
    public assigned: boolean;
    public apiKey: string;
    public panelURL: string;
    public nodeID: number;

    constructor(data: NodeAllocationType, apiKey: string, panelURL: string, nodeId: number) {
        if (!data) throw new Error("Invalid allocation data. Recevied: " + data);
        this.id = data.attributes.id;
        this.ip = data.attributes.ip;
        this.alias = data.attributes.alias;
        this.port = data.attributes.port;
        this.notes = data.attributes.notes;
        this.assigned = data.attributes.assigned;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nodeID = nodeId;
    }

    async delete(): Promise<boolean> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(async res => {
            if (res.status === 204) return true;
            
            const data = (await res.json()) as any;
            throw new Error(data.errors[0].detail);
        }).catch(e => {throw e})
    }
}

/**
 * Node Allocations Manager
 * Manage the Allocations of a Node
 * @public
 */

export class NodeAllocationsManager {
    public apiKey: string;
    public panelURL: string;
    public nodeID: number;

    constructor(apiKey: string, panelURL: string, nodeID: number) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nodeID = nodeID;
    }


    async fetchAll(): Promise<NodeAllocation[]> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) {throw new Error(data.errors[0].detail);}
            return(data.data.map((allocation: NodeAllocationType) => new NodeAllocation(allocation, this.apiKey, this.panelURL, this.nodeID)));
        }).catch(e => {throw e})
    }

    async create(ip: string, port: string[]): Promise<boolean> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ip: ip,
                ports: port
            })
        }).then(async res => {
            if (res.status === 204) return true;

            const json = await res.json() as any;
            throw new Error(json.errors[0].detail);
        }).catch(e => {throw e})
    }

    async fetchByPort(port: number): Promise<NodeAllocation> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            const allocation = data.data.find((allocation: NodeAllocationType) => allocation.attributes.port === port);
            return(new NodeAllocation(allocation, this.apiKey, this.panelURL, this.nodeID));
        }).catch(e => {throw e})
    }
}