"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    server;
    type;
    name;
    mode;
    size;
    isFile;
    isSymlink;
    isEditable;
    mimeType;
    createdAt;
    modifiedAt;
    apiKey;
    panelURL;
    appKey;
    constructor(server, data, apiKey, panelURL, appKey) {
        this.server = server;
        this.type = data?.object;
        this.name = data.attributes.name;
        this.mode = data.attributes.mode;
        this.size = data.attributes.size;
        this.isFile = data.attributes.is_file;
        this.isSymlink = data.attributes.is_symlink;
        this.isEditable = data.attributes.is_editable;
        this.mimeType = data.attributes.mime;
        this.createdAt = data.attributes.created_at;
        this.modifiedAt = data.attributes.modified_at;
        this.apiKey = apiKey;
        this.panelURL = panelURL;
        this.appKey = appKey;
    }
    async rename(root, newName) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/rename`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "root": root,
                "files": [
                    {
                        "from": this.name,
                        "to": newName
                    }
                ]
            })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async copy(location) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/copy`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "location": location
            })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async write(path, content) {
        const file = encodeURI(path);
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/write?file=${file}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json"
            },
            body: content
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
    async delete(root, files) {
        if (!this.appKey)
            throw new Error("APP key not set");
        if (!this.panelURL)
            throw new Error("Panel URL not set");
        return fetch(`${this.panelURL}/api/client/servers/${this.server.attributes.identifier}/files/delete`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.appKey}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                root: root,
                "files": files
            })
        }).then(async (res) => {
            if (res.status === 204)
                return (true);
            const json = (await res.json());
            throw new Error(json.errors[0].detail);
        }).catch(e => { throw e; });
    }
}
exports.File = File;
