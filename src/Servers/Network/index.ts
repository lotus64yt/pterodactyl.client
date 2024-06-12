import { Server } from "http";
import { AllocationType } from "../../Types/Allocation";
import { ServerType } from "../../Types/Server";

/**
 * Allocation
 * Object of an server's allocation
 */

export class Allocation {
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

    constructor(server: ServerType, data: AllocationType, apiKey: string, panelURL: string, appKey: string) {
        this.server = server;
        this.type = data?.object;
        this.id = data?.attributes.id;
        this.ip = data?.attributes.ip;
        this.ipAlias = data?.attributes.ip_alias;
        this.port = data?.attributes.port;
        this.notes = data?.attributes.notes;
        this.isDefault = data?.attributes.is_default;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }

    async delete(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations/${this.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(async res => {
                if (res.status === 204) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => {throw e})
    }

    async setNotes(notes: string): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");
            
            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations/${this.id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    notes: notes
                })
            }).then(async res => {
                if (res.status === 200) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => {throw e})
    }

    async setPrimary(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");
            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations/${this.id}/primary`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    is_default: true
                })
            }).then(async res => {
                if (res.status === 200) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => {throw e})
    }
}
/**
 * Allocations Manager
 * Class for manage the allocations of a server
 * @public
 */
export class AllocationsManager {
    server: ServerType;
    apiKey: string;
    panelURL: string;
    appKey: string;

    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.server = server;
        this.appKey = appKey
    }

    async fetchAll(): Promise<Allocation[]> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(data.data.map((data: AllocationType) => new Allocation(this.server, data, this.apiKey, this.panelURL, this.appKey)));
            }).catch(e => {throw e})
    }

    async assign(): Promise<Allocation> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Allocation(this.server, data.data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }
}