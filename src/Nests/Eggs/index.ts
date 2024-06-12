"use strict"

import { EggType } from "../../Types/Egg";import { NestType } from "src/Types/Nest";

/**
 *  Egg
 * Class to manage eggs
 */
export class Egg {
    public apiKey: string;
    public panelURL: string;
    public nestID: string;

    "type": string;
    "id": number;
    "uuid": string;
    "name": string;
    "nest": NestType;
    "author": string;
    "description": string;
    "docker_image": string;
    "config": any;
    "startup": string;
    "script": {
        "privileged": boolean,
        "install": string,
        "entry": string,
        "container": string,
        "extends": null | string,
    };
    "createdAt": string;
    "updatedAt": string;
    "relationships": any


    constructor(data: any, apiKey: string, panelURL: string, nestID: string) {
        this.type = data.object;
        this.id = data.attributes.id;
        this.uuid = data.attributes.uuid;
        this.name = data.attributes.name;
        this.nest = data.attributes.nest;
        this.author = data.attributes.author;
        this.description = data.attributes.description;
        this.docker_image = data.attributes.docker_image;
        this.config = data.attributes.config;
        this.startup = data.attributes.startup;
        this.script = data.attributes.script;
        this.createdAt = data.attributes.created_at;
        this.updatedAt = data.attributes.updated_at;
        this.relationships = data.attributes.relationships;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nestID = nestID;
    }
}

/**
 *  EggsManager
 * Class to manage eggs
 */

export class EggsManager {
    public apiKey: string;
    public panelURL: string;
    public nestID: string;

    constructor(apiKey: string, panelURL: string, nestID: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.nestID = nestID;
    }

    async fetchAll(): Promise<Egg[]> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nests/${this.nestID}/eggs`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) {throw new Error(data.errors[0].detail);}
            return(data.data.map((egg: EggType) => new Egg(egg, this.apiKey, this.panelURL, this.nestID)));
        }).catch(e => {throw e})
    }

    /**
     * 
     * @param id - Egg ID
     */
    async fetch(id: number): Promise<Egg> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/nests/${this.nestID}/eggs/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return(new Egg(data, this.apiKey, this.panelURL, this.nestID));
        }).catch(e => {throw e})
    }
}