"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeAllocationsManager = exports.NodeAllocation = void 0;
/**
 * Node Allocation
 * Node Allocation Object
 * @public
 */
class NodeAllocation {
    id;
    ip;
    alias;
    port;
    notes;
    assigned;
    apiKey;
    panelURL;
    nodeID;
    constructor(data, apiKey, panelURL, nodeId) {
        if (!data)
            throw new Error("Invalid allocation data. Recevied: " + data);
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
    async delete() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(async (res) => {
            if (res.status === 204)
                return true;
            const data = (await res.json());
            throw new Error(data.errors[0].detail);
        }).catch(e => { throw e; });
    }
}
exports.NodeAllocation = NodeAllocation;
/**
 * Node Allocations Manager
 * Manage the Allocations of a Node
 * @public
 */
class NodeAllocationsManager {
    apiKey;
    panelURL;
    nodeID;
    constructor(apiKey, panelURL, nodeID) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nodeID = nodeID;
    }
    async fetchAll() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors) {
                throw new Error(data.errors[0].detail);
            }
            return (data.data.map((allocation) => new NodeAllocation(allocation, this.apiKey, this.panelURL, this.nodeID)));
        }).catch(e => { throw e; });
    }
    async create(ip, port) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
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
        }).then(async (res) => {
            if (res.status === 204)
                return true;
            const json = await res.json();
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async fetchByPort(port) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nodes/${this.nodeID}/allocations/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            const allocation = data.data.find((allocation) => allocation.attributes.port === port);
            return (new NodeAllocation(allocation, this.apiKey, this.panelURL, this.nodeID));
        }).catch(e => { throw e; });
    }
}
exports.NodeAllocationsManager = NodeAllocationsManager;
