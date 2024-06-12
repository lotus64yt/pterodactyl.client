"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Egg = void 0;
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
