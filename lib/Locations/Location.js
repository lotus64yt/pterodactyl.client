"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
/**
 * Location
 * Class to manage locations
 * @public
 */
class Location {
    apiKey;
    panelURL;
    object;
    id;
    short;
    long;
    updatedAt;
    createdAt;
    constructor(data, apiKey, panelURL) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.object = data.object;
        this.id = data.attributes.id;
        this.short = data.attributes.short;
        this.long = data.attributes.long;
        this.updatedAt = data.attributes.updated_at;
        this.createdAt = data.attributes.created_at;
    }
    async delete() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/locations/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(async (res) => {
            if (res.status === 204)
                return true;
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async update(data) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/locations/${this.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if (res.status === 200)
                return new Location((await res.json()).data, this.apiKey, this.panelURL);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
}
exports.Location = Location;
