import { NodeType } from "../Types/Node";
import { NodeBuilder } from "src/Builders";

import { NodeAllocationsManager } from "./Allocations/index";

/**
 * Node
 * Node object
 * @public
 */

export class Node {
    public apiKey: string;
    public panelURL: string;
    public id: number;
    public uuid: string;
    public public: boolean;
    public name: string;
    public description: string;
    public locationID: number;
    public fqdn: string;
    public scheme: string;
    public behindProxy: boolean;
    public maintenanceMode: boolean;
    public memory: number;
    public memoryOverallocate: number;
    public disk: number;
    public diskOverallocate: number;
    public uploadSize: number;
    public daemonListen: number;
    public daemonSFTP: number;
    public daemonBase: string;
    public createdAt: string;
    public updatedAt: string;

    constructor(data: NodeType, apiKey: string, panelURL: string) {
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

    async edit(data: any): Promise<Node> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${this.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return(new Node(data, this.apiKey, this.panelURL));
        }).catch(e => {throw e})
    }

    async delete(): Promise<boolean> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${this.id}`, {
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

    get allocations(): typeof NodeAllocationsManager.prototype {
        return new NodeAllocationsManager(this.apiKey, this.panelURL, this.id);
    }
}

/**
 * NodesManager
 * Class to manage nodes
 * @public
 */

export class NodesManager {
    public apiKey: string;
    public panelURL: string;

    constructor(apiKey: string, panelURL: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }

    async fetchAll(): Promise<Node[]> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) {throw new Error(data.errors[0].detail);}
            return(data.data.map((node: NodeType) => new Node(node, this.apiKey, this.panelURL)));
        }).catch(e => {throw e})
    }

    async fetch(id: number): Promise<Node> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return(new Node(data, this.apiKey, this.panelURL));
        }).catch(e => {throw e})
    }

    async create(data: NodeBuilder): Promise<Node> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nodes`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return(new Node(data, this.apiKey, this.panelURL));
        }).catch(e => {throw e})
    }
}