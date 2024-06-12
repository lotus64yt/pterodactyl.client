"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestManager = exports.Nest = void 0;
const Eggs_1 = require("./Eggs");
/**
 *  Nest
 * Manage nests
 */
class Nest {
    apiKey;
    panelURL;
    type;
    id;
    uuid;
    author;
    name;
    description;
    createdAt;
    updatedAt;
    constructor(data, apiKey, panelURL) {
        this.type = data.object;
        this.id = data.attributes.id;
        this.uuid = data.attributes.uuid;
        this.author = data.attributes.author;
        this.name = data.attributes.name;
        this.description = data.attributes.description;
        this.createdAt = data.attributes.created_at;
        this.updatedAt = data.attributes.updated_at;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }
    get eggs() {
        if (!this.apiKey)
            throw new Error("API Key not provided.");
        return new Eggs_1.EggsManager(this.apiKey, this.panelURL, this.id);
    }
}
exports.Nest = Nest;
/**
 *  NestManager
 * Manage nests
 * @public
 */
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
            return data.data.map((nest) => new Nest(nest, this.apiKey, this.panelURL));
        });
    }
    /**
     *
     * @param id - Nest ID
     */
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
            return new Nest(data, this.apiKey, this.panelURL);
        });
    }
}
exports.NestManager = NestManager;
