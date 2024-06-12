"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUser = void 0;
class ServerUser {
    server;
    type;
    uuid;
    username;
    email;
    image;
    a2f;
    created;
    permissions;
    apiKey;
    panelURL;
    appKey;
    constructor(server, data, apiKey, panelURL, appKey) {
        this.server = server;
        this.type = data?.object;
        this.uuid = data?.attributes.uuid;
        this.username = data?.attributes.username;
        this.email = data?.attributes.email;
        this.image = data?.attributes.image;
        this.a2f = data?.attributes["2fa_enabled"];
        this.created = data?.attributes.created_at;
        this.permissions = data?.attributes.permissions;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }
    async edit(permissions) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/users/${this.uuid}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                permissions
            })
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new ServerUser(this.server, data, this.apiKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
    async remove() {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/users/${this.uuid}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const data = (await res.json());
            throw new Error(data.errors[0].detail);
        }).catch(e => { throw e; });
    }
}
exports.ServerUser = ServerUser;
