import { ServerType } from "../../Types/Server";
import { BackupType } from "../../Types/Backup";

/**
 * Backup
 * Class to manage backups
 * @public
 */
export class Backup {
    server: ServerType;
    type: string;
    name: string;
    uuid: string;
    ignoredFiles: string[];
    sha256Hash: string;
    bytes: number;
    createdAt: string;
    completedAt: string;
    apiKey: string;
    panelURL: string;
    appKey: string;
    
    constructor(server: ServerType, data: BackupType, apiKey: string, panelURL: string, appKey: string) {
        this.server = server;
        this.type = data?.object;
        this.name = data?.attributes.name;
        this.uuid = data?.attributes.uuid;
        this.ignoredFiles = data?.attributes.ignored_files;
        this.sha256Hash = data?.attributes.sha256_hash;
        this.bytes = data?.attributes.bytes;
        this.createdAt = data?.attributes.created_at;
        this.completedAt = data?.attributes.completed_at;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }
    async generateDownloadUrl(): Promise<string | Error> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups/${this.uuid}/download`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(data.attributes.url);
            }).catch(e => {throw e})
    }

    async delete(): Promise<boolean | Error> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups/${this.uuid}`, {
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
}

/**
 * Backups Manager
 * Class for manage backups of a server
 * @public
 */

export class BackupsManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.server = server;
        this.appKey = appKey
    }

    async fetchAll(): Promise<Backup[] | Error>{
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(data.data.map((data: BackupType) => new Backup(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier)));
            }).catch(e => {throw e})    
    }

    async fetch(uuid: string): Promise<Backup | Error> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups/${uuid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Backup(this.server, data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }

    async create(): Promise<Backup | Error>{
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Backup(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier));
            }).catch(e => {throw e})    
    }
}
