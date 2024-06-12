"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nest = void 0;
const index_1 = require("./Eggs/index");
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
        return new index_1.EggsManager(this.apiKey, this.panelURL, this.id);
    }
}
exports.Nest = Nest;
