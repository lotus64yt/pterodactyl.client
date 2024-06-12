"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasesManager = exports.Database = void 0;
/**
 * Database
 * Class for manage a database of a server
 * @public
 */
class Database {
    server;
    type;
    id;
    adress;
    port;
    name;
    username;
    connectionFrom;
    maxConnections;
    apiKey;
    panelURL;
    appKey;
    constructor(server, data, apiKey, panelURL, appKey) {
        this.server = server;
        this.type = data?.object;
        this.id = data?.attributes.id;
        this.adress = data?.attributes.host.adress;
        this.port = data?.attributes.host.port;
        this.name = data?.attributes.name;
        this.username = data?.attributes.username;
        this.connectionFrom = data?.attributes.connection_from;
        this.maxConnections = data?.attributes.max_connections;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }
    async rotatePassword() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases/${this.id}/rotate-password`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (`${data.attributes.relationships.password.attributes.password}`);
        }).catch(e => { throw e; });
    }
    async delete() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const data = (await res.json());
            return (data.errors[0].detail);
        }).catch(e => { throw e; });
    }
}
exports.Database = Database;
/**
 * Databases Manager
 * Class for manages the databases of a server
 * @public
 */
class DatabasesManager {
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
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.data.map((data) => new Database(this.server, data, this.apiKey, this.panelURL, this.appKey)));
        }).catch(e => { throw e; });
    }
    async create(name, remote = "%") {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "database": name,
                "remote": remote
            })
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Database(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier));
        }).catch(e => { throw e; });
    }
}
exports.DatabasesManager = DatabasesManager;
