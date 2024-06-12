"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariablesManager = exports.Variable = void 0;
/**
 * Variable
 * Object of a server's variable
 */
class Variable {
    server;
    type;
    name;
    description;
    envVariable;
    defaultValue;
    serverValue;
    isEditable;
    rules;
    apiKey;
    panelURL;
    appKey;
    constructor(server, data, apiKey, panelURL, appKey) {
        this.server = server;
        this.type = data.object;
        this.name = data.attributes.name;
        this.description = data.attributes.description;
        this.envVariable = data.attributes.env_variable;
        this.defaultValue = data.attributes.default_value;
        this.serverValue = data.attributes.server_value;
        this.isEditable = data.attributes.is_editable;
        this.rules = data.attributes.rules;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }
    async update(key, value) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup/variable`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "key": key,
                "value": value
            })
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Variable(this.server, data, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
}
exports.Variable = Variable;
/**
 * Variables Manager
 * Class for manage the variables of a server
 * @public
 */
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
            return (data.data.map((variable) => new Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey)));
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
            return (new Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey));
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
            return (new Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
}
exports.VariablesManager = VariablesManager;
