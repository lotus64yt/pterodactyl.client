"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeAllocation = void 0;
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
