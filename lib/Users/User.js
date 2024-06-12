"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 *  User
 * User class
 */
class User {
    id;
    username;
    email;
    firstName;
    lastName;
    language;
    rootAdmin;
    externalId;
    uuid;
    createdAt;
    updatedAt;
    a2f;
    apiKey;
    panelURL;
    constructor(data, apiKey, panelURL) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.language = data.language;
        this.rootAdmin = data.root_admin;
        this.externalId = data.external_id;
        this.uuid = data.uuid;
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        this.a2f = data["2fa_enabled"];
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }
    async delete() {
        const user = this;
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/users/${user.id}`, {
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
    /**
     *
     * @param data - User data
     */
    async edit(data) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/users/${this.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new User(data.attributes, this.apiKey, this.panelURL));
        }).catch(e => { throw e; });
    }
}
exports.User = User;
