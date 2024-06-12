"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersManager = exports.Server = void 0;
const Files_1 = require("./Files");
const Variables_1 = require("./Variables");
const Backups_1 = require("./Backups");
const Databases_1 = require("./Databases");
const Network_1 = require("./Network");
const ServerUsers_1 = require("./ServerUsers");
/**
 *  Server
 * Server class
 */
class Server {
    apiKey;
    panelURL;
    data;
    appKey;
    type;
    name;
    id;
    externalId;
    uuid;
    identifier;
    description;
    suspended;
    limits;
    constructor(data, apiKey, panelURL, appKey = null) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
        this.type = data.object;
        this.name = data.attributes.name;
        this.id = data.attributes.id;
        this.externalId = data.attributes.external_id;
        this.uuid = data.attributes.uuid;
        this.identifier = data.attributes.identifier;
        this.description = data.attributes.description;
        this.suspended = data.attributes.suspended;
        this.limits = data.attributes.limits;
        this.data = data;
    }
    async suspend() {
        if (this.suspended)
            throw new Error("Server is suspended");
        return fetch(`${this.panelURL}/api/application/servers/${this.id}/suspend`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return (true); }).catch(e => { throw e; });
    }
    async unsuspend() {
        if (!this.suspended)
            throw new Error("Server isn't suspended");
        return fetch(`${this.panelURL}/api/application/servers/${this.id}/unsuspend`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return (true); }).catch(e => { throw e; });
    }
    async delete() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return (true); }).catch(e => { throw e; });
    }
    async reinstall() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers/${this.id}/reinstall`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return true; }).catch(e => { throw e; });
    }
    async editDetails(data) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers/${this.id}/details`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Server(data, this.apiKey, this.panelURL));
        });
    }
    async editBuild(data) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers/${this.id}/build`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Server(data, this.apiKey, this.panelURL));
        });
    }
    async start() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ signal: "start" })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail ?? "An error occurred");
        }).catch(e => { throw e; });
    }
    async stop() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ signal: "stop" })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async kill() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ signal: "kill" })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async restart() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ signal: "restart" })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async sendCommand(command) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/command`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    get files() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new Files_1.FilesManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get variables() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new Variables_1.VariablesManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get backups() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new Backups_1.BackupsManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get databases() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new Databases_1.DatabasesManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get allocations() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new Network_1.AllocationsManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get users() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new ServerUsers_1.ServerUsersManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
}
exports.Server = Server;
/**
 *  ServersManager
 * Class to manage servers
 * @public
 */
class ServersManager {
    apiKey;
    panelURL;
    appKey;
    constructor(api, url, appKey = null) {
        this.apiKey = api;
        this.panelURL = url;
        this.appKey = appKey;
    }
    async fetchAll() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            if (data.data)
                return (data.data.map((server) => new Server(server, this.apiKey, this.panelURL, this.appKey)));
            throw new Error("Failed to fetch servers");
        }).catch(e => { throw e; });
    }
    /**
     *
     * @param id - Server ID
     */
    async fetch(id) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Server(data, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
    /**
     *
     * @param data - Server data
     */
    async create(data) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/servers`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Server(data, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
}
exports.ServersManager = ServersManager;
