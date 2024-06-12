import { LocationType } from "../Types/Location";

/**
 * Location
 * Class to manage locations
 * @public
 */
export class Location {
    public apiKey: string;
    public panelURL: string;
    object: string;
    id: number;
    short: string;
    long: string;
    updatedAt: string;
    createdAt: string;

    constructor(data: LocationType, apiKey: string, panelURL: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.object = data.object;
        this.id = data.attributes.id;
        this.short = data.attributes.short;
        this.long = data.attributes.long;
        this.updatedAt = data.attributes.updated_at;
        this.createdAt = data.attributes.created_at;
    }

    async delete(): Promise<boolean> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/locations/${this.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json"
            }
        }).then(async res => {
            if (res.status === 204) return true;
            const json = (await res.json()) as any;
            throw new Error(json.errors[0].detail)
        }).catch(e => {throw e})
    }

    async update(data: { short: string, long: string }): Promise<Location> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/locations/${this.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(async res => {
            if (res.status === 200) return new Location((await res.json() as any).data, this.apiKey, this.panelURL);
            const json = (await res.json()) as any;
            throw new Error(json.errors[0].detail)
        }).catch(e => {throw e})
    }
}

/**
 *  LocationsManager
 * Class to manage locations
 * @public
 */
export class LocationsManager {
    public apiKey: string;
    public panelURL: string;

    constructor(apiKey: string, panelURL: string) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
    }

    async fetchAll(): Promise<Location[]> {
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/application/locations`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) {throw new Error(data.errors[0].detail);}
                return(data.data.map((location: LocationType) => new Location(location, this.apiKey, this.panelURL)));
            }).catch(e => {throw e})
        }

    async fetch(id: number): Promise<Location> {
            if (!this.apiKey) throw new Error("API key not set");
            if (!this.panelURL) throw new Error("Panel URL not set");

            return fetch(`${this.panelURL}/api/application/locations/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Accept": "application/json"
                }
            }).then(res => res.json()).then((data: any) => {
                if (data.errors) throw new Error(data.errors[0].detail);
                return(new Location(data, this.apiKey, this.panelURL));
            }).catch(e => {throw e})
    }

    async create(long: string, short: string): Promise<Location> {
        if (!this.apiKey) throw new Error("API key not set");
        if (!this.panelURL) throw new Error("Panel URL not set");

        return fetch(`${this.panelURL}/api/application/locations`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "long": long,
                "short": short
            })
        }).then(res => res.json()).then((data: any) => {
            if (data.errors) throw new Error(data.errors[0].detail);
            return(new Location(data, this.apiKey, this.panelURL));
        }).catch(e => {throw e})
    }
}