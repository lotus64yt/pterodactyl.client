import { ServerType } from "../../Types/Server"
import { VariableType } from "../../Types/Variable";

/**
 * Variable
 * Object of a server's variable
 */

export class Variable {
    server: ServerType;
    type: string;
    name: string;
    description: string;
    envVariable: string;
    defaultValue: string;
    serverValue: string;
    isEditable: boolean;
    rules: string;
    apiKey: string;
    panelURL: string;
    appKey: string;

    constructor(server: ServerType, data: VariableType, apiKey: string, panelURL: string, appKey: string) {
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

    async update(key: string, value: string): Promise<Variable>{
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

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
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);

                return(new Variable(this.server, data, this.apiKey, this.panelURL, this.appKey))
            }).catch(e => {throw e})
    }

}

/**
 * Variables Manager
 * Class for manage the variables of a server
 * @public
 */

export class VariablesManager {
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

    async fetchAll(): Promise<Variable[]>{
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(data.data.map((variable: VariableType) => new Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey)));
            }).catch(e => {throw e})
    }

    async fetchByName(name: string): Promise<Variable> {
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                const variable = data.data.find((variable: VariableType) => variable.attributes.name === name);
                if (!variable) throw new Error("Variable not found");
                return(new Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }

    async fetchByEnvVariable(envVariable: string): Promise<Variable> {
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/startup`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                const variable = data.data.find((variable: VariableType) => variable.attributes.env_variable === envVariable);
                if (!variable) throw new Error("Variable not found");
                return(new Variable(this.server, variable, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }
}