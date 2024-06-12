"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesManager = void 0;
const File_1 = require("./File");
class FilesManager {
    apiKey;
    panelURL;
    server;
    appKey;
    constructor(server, apiKey, panelURL, appKey) {
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.server = server;
        this.appKey = appKey;
    }
    async fetchByName(name) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/list?directory=/&name=${name}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (new File_1.File(this.server, data.data.find((file) => file.attributes.name.toLowerCase() === name.toLowerCase()), this.appKey, this.panelURL, this.appKey));
        }).catch(e => { throw e; });
    }
    async fetchList(directory = "/") {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/list?directory=${directory}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.data.map((file) => new File_1.File(this.server, file, this.apiKey, this.panelURL, this.appKey)));
        }).catch(e => { throw e; });
    }
    async fetchContent(filePath) {
        const file = encodeURI(filePath);
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/contents?file=${file}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data);
        }).catch(e => { throw e; });
    }
    async generateDownloadLink(filePath) {
        const file = encodeURI(filePath);
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/download?file=${file}`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${this.appKey}`,
                "content-type": "application/json",
                'accept': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            if (data.errors)
                throw new Error(data.errors[0].detail);
            return (data.attributes.url);
        });
    }
}
exports.FilesManager = FilesManager;
