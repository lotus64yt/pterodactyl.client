import { ServerType } from "../../Types/Server";
import { DatabaseType } from "../../Types/Database";

/**
 * Database
 * Class for manage a database of a server
 * @public
 */

export class Database {
    server: ServerType;
    type: string;
    id: number;
    adress: string;
    port: number;
    name: string;
    username: string;
    connectionFrom: string;
    maxConnections: number;
    apiKey: string;
    panelURL: string;
    appKey: string;

    constructor(server: ServerType, data: DatabaseType, apiKey: string, panelURL: string, appKey: string) {
        this.server = server;
        this.type = data?.object;
        this.id = data?.attributes.id;
        this.adress = data?.attributes.host.adress;
        this.port = data?.attributes.host.port;
        this.name = data?.attributes.name;
        this.username = data?.attributes.username;
        this.connectionFrom = data?.attributes.connection_from;
        this.maxConnections = data?.attributes.max_connections;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }

    async rotatePassword(): Promise<string> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases/${this.id}/rotate-password`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return (`${data.attributes.relationships.password.attributes.password}`);
            }).catch(e => { throw e })
    }

    async delete(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases/${this.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(async res => {
                if (res.status === 204) return(true);
                const data = (await res.json()) as any;
                return(data.errors[0].detail);
            }).catch(e => { throw e })
    }
}

/**
 * Databases Manager
 * Class for manages the databases of a server
 * @public
 */

export class DatabasesManager {
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

    async fetchAll(): Promise<DatabaseType> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(data.data.map((data: DatabaseType) => new Database(this.server, data, this.apiKey, this.panelURL, this.appKey)));
            }).catch(e => {throw e})
    }

    async create(name: string, remote: string = "%"): Promise<Database> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/databases`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "database": name,
                    "remote": remote
                  })
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Database(this.server, data, this.apiKey, this.panelURL, this.server.attributes.identifier));
            }).catch(e => {throw e})    
    }
}