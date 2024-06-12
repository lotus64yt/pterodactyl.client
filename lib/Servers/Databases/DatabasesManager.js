"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasesManager = void 0;
const Database_1 = require("./Database");
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
            return (data.data.map((data) => new Database_1.Database(this.server, data, this.apiKey, this.panelURL, this.appKey)));
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
            return (new Database_1.Database(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier));
        }).catch(e => { throw e; });
    }
}
exports.DatabasesManager = DatabasesManager;
