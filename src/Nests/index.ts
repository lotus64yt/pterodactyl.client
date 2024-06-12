import { NestType } from "../Types/Nest";
import { EggsManager } from "./Eggs";

/**
 *  Nest
 * Manage nests
 */
export class Nest {
    public apiKey: string;
    public panelURL: string;
    type: string;
    id: string;
    uuid: string;
    author: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: NestType, apiKey: string, panelURL: string) {
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
        if (!this.apiKey) throw new Error("API Key not provided.");
        return new EggsManager(this.apiKey, this.panelURL, this.id);
    }
    
}

/**
 *  NestManager
 * Manage nests
 * @public
 */
export class NestManager {
    public apiKey: string;
    public panelURL: string;

    constructor(apiKey: string, panelURL: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }

    async fetchAll(): Promise<Nest[]> {
        if (!this.apiKey) throw new Error("API Key not provided.");
        if (!this.panelURL) throw new Error("Panel URL not provided.");

        return fetch(`${this.panelURL}/api/application/nests`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return data.data.map((nest: any) => new Nest(nest, this.apiKey, this.panelURL));
        })
    }

    /**
     * 
     * @param id - Nest ID
     */
    async fetch(id: number): Promise<Nest> {
        if (!this.apiKey) throw new Error("API Key not provided.");
        if (!this.panelURL) throw new Error("Panel URL not provided.");

        return fetch(`${this.panelURL}/api/application/nests/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return new Nest(data, this.apiKey, this.panelURL);
        })
    }
}