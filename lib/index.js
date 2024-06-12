"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pterodactyl = void 0;
const index_1 = require("./Users/index");
const index_2 = require("./Servers/index");
const index_3 = require("./Nests/index");
const index_4 = require("./Locations/index");
const index_5 = require("./Nodes/index");
/**
 *  Pterodactyl
 * Main class to interact
 * @public
 */
class Pterodactyl {
    apiKey;
    panelURL;
    applicationKey;
    constructor() {
        this.apiKey = null;
        this.panelURL = null;
        this.applicationKey = null;
    }
    /**
     * Required: Set the API key (admin panel key)
     * @param apiKey - The API key
     *
     */
    setApiKey(apiKey) {
        if (typeof apiKey !== "string")
            throw new Error("API key must be a string");
        this.apiKey = apiKey;
        return this;
    }
    /**
     * Optionnal: Set the application key (client key)
     * @param key - The application key
     */
    setApplicationKey(key) {
        if (typeof key !== "string")
            throw new Error("Application key must be a string");
        this.applicationKey = key;
        return this;
    }
    /**
     * Required: Set the panel URL (ex: https://portal.darkhosts.fr)
     * @param panelURL - The panel URL
     */
    setPanelURL(panelURL) {
        if (typeof panelURL !== "string")
            throw new Error("Panel URL must be a string");
        this.panelURL = panelURL;
        return this;
    }
    /**
     * Get the servers manager
     */
    get servers() {
        return new index_2.ServersManager(this.apiKey, this.panelURL, this.applicationKey);
    }
    /**
     * Get the users manager
     * @returns {UsersManager}
     */
    get users() {
        return new index_1.UsersManager(this.apiKey, this.panelURL);
    }
    /**
     * Get the nests manager
     */
    get nests() {
        return new index_3.NestManager(this.apiKey, this.panelURL);
    }
    /**
     * Get the locations manager
     */
    get locations() {
        return new index_4.LocationsManager(this.apiKey, this.panelURL);
    }
    /**
     * Get the nodes manager
     */
    get nodes() {
        return new index_5.NodesManager(this.apiKey, this.panelURL);
    }
}
exports.Pterodactyl = Pterodactyl;
