"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestManager = exports.Nest = void 0;
const Nest_1 = require("./Nest");
Object.defineProperty(exports, "Nest", { enumerable: true, get: function () { return Nest_1.Nest; } });
class NestManager {
    apiKey;
    panelURL;
    constructor(apiKey, panelURL) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }
    async fetchAll() {
        if (!this.apiKey)
            throw new Error("API Key not provided.");
        if (!this.panelURL)
            throw new Error("Panel URL not provided.");
        return fetch(`${this.panelURL}/api/application/nests`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return data.data.map((nest) => new Nest_1.Nest(nest, this.apiKey, this.panelURL));
        });
    }
    async fetch(id) {
        if (!this.apiKey)
            throw new Error("API Key not provided.");
        if (!this.panelURL)
            throw new Error("Panel URL not provided.");
        return fetch(`${this.panelURL}/api/application/nests/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return new Nest_1.Nest(data, this.apiKey, this.panelURL);
        });
    }
}
exports.NestManager = NestManager;
