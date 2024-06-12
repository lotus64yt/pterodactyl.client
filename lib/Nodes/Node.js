"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const index_1 = require("./Allocations/index");
class Node {
    apiKey;
    panelURL;
    id;
    uuid;
    public;
    name;
    description;
    locationID;
    fqdn;
    scheme;
    behindProxy;
    maintenanceMode;
    memory;
    memoryOverallocate;
    disk;
    diskOverallocate;
    uploadSize;
    daemonListen;
    daemonSFTP;
    daemonBase;
    createdAt;
    updatedAt;
    constructor(data, apiKey, panelURL) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.id = data.attributes.id;
        this.uuid = data.attributes.uuid;
        this.public = data.attributes.public;
        this.name = data.attributes.name;
        this.description = data.attributes.description;
        this.locationID = data.attributes.location_id;
        this.fqdn = data.attributes.fqdn;
        this.scheme = data.attributes.scheme;
        this.behindProxy = data.attributes.behind_proxy;
        this.maintenanceMode = data.attributes.maintenance_mode;
        this.memory = data.attributes.memory;
        this.memoryOverallocate = data.attributes.memory_overallocate;
        this.disk = data.attributes.disk;
        this.diskOverallocate = data.attributes.disk_overallocate;
        this.uploadSize = data.attributes.upload_size;
        this.daemonListen = data.attributes.daemon_listen;
        this.daemonSFTP = data.attributes.daemon_sftp;
        this.daemonBase = data.attributes.daemon_base;
        this.createdAt = data.attributes.created_at;
        this.updatedAt = data.attributes.updated_at;
    }
    /**
     * Required: Set the node name
     * @param name - The name of the node
     */
    async edit(data) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nodes/${this.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Node(data, this.apiKey, this.panelURL));
        }).catch(e => { throw e; });
    }
    async delete() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nodes/${this.id}`, {
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
    get allocations() {
        return new index_1.NodeAllocationsManager(this.apiKey, this.panelURL, this.id);
    }
}
exports.Node = Node;
