import { ServerType } from "../Types/Server";
import { ServerBuilder } from "../Builders/index";

import { FilesManager } from "./Files";
import { VariablesManager } from "./Variables";
import { BackupsManager } from "./Backups";
import { DatabasesManager } from "./Databases";
import { AllocationsManager } from "./Network";
import { ServerUsersManager } from "./ServerUsers";


interface DataFetchAll {
    data: ServerType[];
    errors: {
        status: string;
        code: string;
        detail: string;
    }[] | undefined;
}


/**
 *  Server
 * Server class
 */
export class Server {
    apiKey: string;
    panelURL: string;
    data: any;
    appKey: string | null;
    type: string;
    name: string;
    id: number;
    externalId: string | undefined;
    uuid: string;
    identifier: string;
    description: string;
    suspended: boolean;
    limits: object;

    constructor(data: ServerType, apiKey: string, panelURL: string, appKey: string | null = null) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
        this.type = data.object;
        this.name = data.attributes.name;
        this.id = data.attributes.id;
        this.externalId = data.attributes.external_id;
        this.uuid = data.attributes.uuid;
        this.identifier = data.attributes.identifier;
        this.description = data.attributes.description;
        this.suspended = data.attributes.suspended;
        this.limits = data.attributes.limits;
        this.data = data;
    }

    async suspend(): Promise<boolean> {
        if (this.suspended) throw new Error("Server is suspended");

        return fetch(`${this.panelURL}/api/application/servers/${this.id}/suspend`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return (true) }).catch(e => { throw e })
    }

    async unsuspend(): Promise<boolean> {
        if (!this.suspended) throw new Error("Server isn't suspended");

        return fetch(`${this.panelURL}/api/application/servers/${this.id}/unsuspend`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return (true) }).catch(e => { throw e })
    }

    async delete(): Promise<boolean> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/servers/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return (true) }).catch(e => { throw e })
    }

    async reinstall(): Promise<boolean> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/servers/${this.id}/reinstall`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(() => { return true }).catch(e => { throw e })
    }

    async editDetails(data: {
        "name": string,
        "user": number,
        "external_id": string,
        "description": string
    }): Promise<Server> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/servers/${this.id}/details`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return (new Server(data, this.apiKey, this.panelURL))
        })
    }

    async editBuild(data: {
        "allocation": number,
        "memory": number,
        "swap": number,
        "disk": number,
        "io": number,
        "cpu": number,
        "threads": null | number,
        "feature_limits": {
            "databases": number,
            "allocations": number,
            "backups": number
        }
    }): Promise<Server> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/application/servers/${this.id}/build`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Server(data, this.apiKey, this.panelURL))
            })
    }

    async start(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ signal: "start" })
            }).then(async res => {
                if (res.status === 204) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail ?? "An error occurred");

            }).catch(e => { throw e })
    }

    async stop(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ signal: "stop" })
            }).then(async res => {
                if (res.status === 204) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => { throw e })
    }

    async kill(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ signal: "kill" })
            }).then(async res => {
                if (res.status === 204) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => { throw e })
    }

    async restart(): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/power`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ signal: "restart" })
            }).then(async res => {
                if (res.status === 204) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => { throw e })
    }

    async sendCommand(command: string): Promise<boolean> {
            if (!this.appKey) throw new Error("APP key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/client/servers/${this.identifier}/command`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.appKey}`,
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ command })
            }).then(async res => {
                if (res.status === 204) return(true);
                const json = (await res.json()) as any;
                throw new Error(json.errors[0].detail);

            }).catch(e => { throw e })
    }

    get files() {
        if (!this.appKey) throw new Error("API key not set");
        return new FilesManager(this.data, this.apiKey, this.panelURL, (this.appKey as string))
    }

    get variables() {
        if (!this.appKey) throw new Error("API key not set");
        return new VariablesManager(this.data, this.apiKey, this.panelURL, (this.appKey as string))
    }

    get backups() {
        if (!this.appKey) throw new Error("API key not set");
        return new BackupsManager(this.data, this.apiKey, this.panelURL, (this.appKey as string))
    }

    get databases() {
        if (!this.appKey) throw new Error("API key not set");
        return new DatabasesManager(this.data, this.apiKey, this.panelURL, (this.appKey as string))
    }

    get allocations() {
        if (!this.appKey) throw new Error("API key not set");
        return new AllocationsManager(this.data, this.apiKey, this.panelURL, (this.appKey as string))
    }

    get users() {
        if (!this.appKey) throw new Error("API key not set");
        return new ServerUsersManager(this.data, this.apiKey, this.panelURL, (this.appKey as string))
    }
}

/**
 *  ServersManager
 * Class to manage servers
 * @public
 */
export class ServersManager {
    apiKey: string;
    panelURL: string;
    appKey: string | null;
    constructor(api: string, url: string, appKey: string | null = null) {
        this.apiKey = api;
        this.panelURL = url;
        this.appKey = appKey;
    }

    async fetchAll(): Promise<ServerType[]> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/servers`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            if (data.data) return (data.data.map((server: ServerType) => new Server(server, this.apiKey, this.panelURL, this.appKey)));
            throw new Error("Failed to fetch servers")
        }).catch(e => { throw e })
    }

    /**
     * 
     * @param id - Server ID
     */
    async fetch(id: number): Promise<Server> {
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/application/servers/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Server(data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }

    /**
     * 
     * @param data - Server data
     */
    async create(data: typeof ServerBuilder): Promise<Server> {
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/application/servers`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Server(data, this.apiKey, this.panelURL, this.appKey));
            }).catch(e => {throw e})
    }
}
