"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllocationsManager = void 0;
const Allocation_1 = require("./Allocation");
class AllocationsManager {
    server;
    apiKey;
    panelURL;
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
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.data.map((data) => new Allocation_1.Allocation(this.server, data, this.apiKey, this.panelURL, this.appKey)));
        }).catch(e => { throw e; });
    }
    async assign() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/network/allocations`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Allocation_1.Allocation(this.server, data.data, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
}
exports.AllocationsManager = AllocationsManager;
