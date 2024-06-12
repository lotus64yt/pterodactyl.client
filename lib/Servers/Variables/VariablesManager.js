"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariablesManager = void 0;
const Variable_1 = require("./Variable");
class VariablesManager {
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
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.data.map((variable) => new Variable_1.Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey)));
        }).catch(e => { throw e; });
    }
    async fetchByName(name) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            const variable = data.data.find((variable) => variable.attributes.name === name);
            if (!variable)
                throw new Error("Variable not found");
            return (new Variable_1.Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
    async fetchByEnvVariable(envVariable) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            const variable = data.data.find((variable) => variable.attributes.env_variable === envVariable);
            if (!variable)
                throw new Error("Variable not found");
            return (new Variable_1.Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
}
exports.VariablesManager = VariablesManager;
