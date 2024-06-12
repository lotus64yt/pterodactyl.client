"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersManager = exports.User = void 0;
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
/**
 *  UsersManager
 * Class to manage users
 * @public
 */
class UsersManager {
    apiKey;
    panelURL;
    constructor(apiKey, panelURL) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }
    async fetchAll() {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors) {
                throw new Error(data.errors[0].detail);
            }
            return (data.data.map((user) => new User(user.attributes, this.apiKey, this.panelURL)));
        }).catch(e => { throw e; });
    }
    /**
     *
     * @param id - User ID
     */
    async fetch(id) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/users/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new User(data.attributes, this.apiKey, this.panelURL));
        }).catch(e => { throw e; });
    }
    /**
     *
     * @param email - User email
     */
    async fetchByEmail(email) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/users?filter[email]=${email}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.data.map((user) => new User(user.attributes, this.apiKey, this.panelURL)));
        }).catch(e => { throw e; });
    }
    /**
     *
     * @param user - User data
     */
    async create(user) {
        if (!this.apiKey)
            throw new Error("API key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/application/users`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": user.email,
                "username": user.username,
                "first_name": user.firstName,
                "last_name": user.lastName
            })
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return fetch(`${this.panelURL}/api/application/users/${data.attributes.id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": user.email,
                    "username": user.username,
                    "first_name": user.firstName,
                    "last_name": user.lastName,
                    "language": data.attributes.lang,
                    "password": data.attributes.password
                })
            }).then(res => res.json()).then((e) => {
                if (e.errors)
                    throw new Error(e.errors[0].detail);
                return (new User(e.attributes, this.apiKey, this.panelURL));
            });
        }).catch(e => { throw e; });
    }
}
exports.UsersManager = UsersManager;
