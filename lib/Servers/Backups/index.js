"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupsManager = exports.Backup = void 0;
/**
 * Backup
 * Class to manage backups
 * @public
 */
class Backup {
    server;
    type;
    name;
    uuid;
    ignoredFiles;
    sha256Hash;
    bytes;
    createdAt;
    completedAt;
    apiKey;
    panelURL;
    appKey;
    constructor(server, data, apiKey, panelURL, appKey) {
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
    async generateDownloadUrl() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups/${this.uuid}/download`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.attributes.url);
        }).catch(e => { throw e; });
    }
    async delete() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups/${this.uuid}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
}
exports.Backup = Backup;
/**
 * Backups Manager
 * Class for manage backups of a server
 * @public
 */
class BackupsManager {
    apiKey;
    panelURL;
    server;
    appKey;
    constructor(server, apiKey, panelURL, appKey) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.server = server;
        this.appKey = appKey;
    }
    async fetchAll() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.data.map((data) => new Backup(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier)));
        }).catch(e => { throw e; });
    }
    async fetch(uuid) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups/${uuid}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Backup(this.server, data, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
    async create() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/backups`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Backup(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier));
        }).catch(e => { throw e; });
    }
}
exports.BackupsManager = BackupsManager;
