"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nest = void 0;
class Nest {
    apiKey;
    panelURL;
    _type;
    _id;
    _uuid;
    _author;
    _name;
    _description;
    _createdAt;
    _updatedAt;
    constructor(data, apiKey, panelURL) {
        this._type = data.object;
        this._id = data.attributes.id;
        this._uuid = data.attributes.uuid;
        this._author = data.attributes.author;
        this._name = data.attributes.name;
        this._description = data.attributes.description;
        this._createdAt = data.attributes.created_at;
        this._updatedAt = data.attributes.updated_at;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }
    get type() {
        return this._type;
    }
    get id() {
        return this._id;
    }
    get uuid() {
        return this._uuid;
    }
    get author() {
        return this._author;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
}
exports.Nest = Nest;
