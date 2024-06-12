"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggsManager = exports.Egg = void 0;
/**
 *  Egg
 * Class to manage eggs
 */
class Egg {
    apiKey;
    panelURL;
    nestID;
    "type";
    "id";
    "uuid";
    "name";
    "nest";
    "author";
    "description";
    "docker_image";
    "config";
    "startup";
    "script";
    "createdAt";
    "updatedAt";
    "relationships";
    constructor(data, apiKey, panelURL, nestID) {
        this.type = data.object;
        this.id = data.attributes.id;
        this.uuid = data.attributes.uuid;
        this.name = data.attributes.name;
        this.nest = data.attributes.nest;
        this.author = data.attributes.author;
        this.description = data.attributes.description;
        this.docker_image = data.attributes.docker_image;
        this.config = data.attributes.config;
        this.startup = data.attributes.startup;
        this.script = data.attributes.script;
        this.createdAt = data.attributes.created_at;
        this.updatedAt = data.attributes.updated_at;
        this.relationships = data.attributes.relationships;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nestID = nestID;
    }
}
exports.Egg = Egg;
/**
 *  EggsManager
 * Class to manage eggs
 */
class EggsManager {
    apiKey;
    panelURL;
    nestID;
    constructor(apiKey, panelURL, nestID) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nestID = nestID;
    }
    async fetchAll() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nests/${this.nestID}/eggs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors) {
                throw new Error(data.errors[0].detail);
            }
            return (data.data.map((egg) => new Egg(egg, this.apiKey, this.panelURL, this.nestID)));
        }).catch(e => { throw e; });
    }
    /**
     *
     * @param id - Egg ID
     */
    async fetch(id) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/nests/${this.nestID}/eggs/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new Egg(data, this.apiKey, this.panelURL, this.nestID));
        }).catch(e => { throw e; });
    }
}
exports.EggsManager = EggsManager;
