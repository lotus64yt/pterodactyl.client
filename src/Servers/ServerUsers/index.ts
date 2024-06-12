import { ServerUserType } from "../../Types/ServerUser";
import { ServerType } from "../../Types/Server";

/**
 * Server User
 * A user of a server
 * @public
 */

export class ServerUser {
    server: ServerType;
    type: string;
    uuid: string;
    username: string;
    email: string;
    image: string;
    a2f: boolean;
    created: string;
    permissions: string[];
    apiKey: string;
    panelURL: string;
    appKey: string;

    constructor(server: ServerType, data: ServerUserType, apiKey: string, panelURL: string, appKey: string) {
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

    async edit(permissions: string[]): Promise<ServerUser> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

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
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new ServerUser(this.server, data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }

    async remove(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/users/${this.uuid}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(async res => {
                if (res.status === 204) return(true);
                const data = (await res.json()) as any;
                throw new Error(data.errors[0].detail);
            }).catch(e => { throw e })
    }
}

/**
 * Server Users Manager
 * Class for manage the server's users
 * @public
 */

export class ServerUsersManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;

    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.server = server;
        this.appKey = appKey
    }

    async fetchAll(): Promise<ServerUser[]> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/users`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(data.data.map((data: ServerUserType) => new ServerUser(this.server, data, this.apiKey, this.panelURL, this.appKey)));
            }).catch(e => { throw e})
    }

    async fetch(uuid: string): Promise<ServerUser> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/users/${uuid}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new ServerUser(this.server, data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => { throw e })
    }

    async add(email: string, permissions: string[]) {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/users`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    permissions
                })
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new ServerUser(this.server, data.data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => { throw e})
    }
    
}