"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allocation = exports.AllocationsManager = exports.Database = exports.DatabasesManager = exports.Backup = exports.BackupsManager = exports.Variable = exports.VariablesManager = exports.File = exports.FilesManager = exports.Server = void 0;
const FilesManager_1 = require("./Files/FilesManager");
Object.defineProperty(exports, "FilesManager", { enumerable: true, get: function () { return FilesManager_1.FilesManager; } });
const File_1 = require("./Files/File");
Object.defineProperty(exports, "File", { enumerable: true, get: function () { return File_1.File; } });
const VariablesManager_1 = require("./Variables/VariablesManager");
Object.defineProperty(exports, "VariablesManager", { enumerable: true, get: function () { return VariablesManager_1.VariablesManager; } });
const Variable_1 = require("./Variables/Variable");
Object.defineProperty(exports, "Variable", { enumerable: true, get: function () { return Variable_1.Variable; } });
const BackupsManager_1 = require("./Backups/BackupsManager");
Object.defineProperty(exports, "BackupsManager", { enumerable: true, get: function () { return BackupsManager_1.BackupsManager; } });
const Backup_1 = require("./Backups/Backup");
Object.defineProperty(exports, "Backup", { enumerable: true, get: function () { return Backup_1.Backup; } });
const DatabasesManager_1 = require("./Databases/DatabasesManager");
Object.defineProperty(exports, "DatabasesManager", { enumerable: true, get: function () { return DatabasesManager_1.DatabasesManager; } });
const Database_1 = require("./Databases/Database");
Object.defineProperty(exports, "Database", { enumerable: true, get: function () { return Database_1.Database; } });
const AllocationsManager_1 = require("./Network/AllocationsManager");
Object.defineProperty(exports, "AllocationsManager", { enumerable: true, get: function () { return AllocationsManager_1.AllocationsManager; } });
const Allocation_1 = require("./Network/Allocation");
Object.defineProperty(exports, "Allocation", { enumerable: true, get: function () { return Allocation_1.Allocation; } });
const ServerUsersManager_1 = require("./ServerUsers/ServerUsersManager");
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
        return new FilesManager_1.FilesManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get variables() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new VariablesManager_1.VariablesManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get backups() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new BackupsManager_1.BackupsManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get databases() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new DatabasesManager_1.DatabasesManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get allocations() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new AllocationsManager_1.AllocationsManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
    get users() {
        if (!this.appKey)
            throw new Error("API key not set");
        return new ServerUsersManager_1.ServerUserManager(this.data, this.apiKey, this.panelURL, this.appKey);
    }
}
exports.Server = Server;
