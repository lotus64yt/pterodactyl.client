
import { ServerUserPermissions } from "./BitFields";
import { UsersManager } from "./Users/index"
import { ServersManager } from "./Servers/index"
import { NestManager } from "./Nests/index"
import { ServerBuilder, UserBuilder, NodeBuilder } from "./Builders/index";
import { LocationsManager} from "./Locations/index";
import { NodesManager } from "./Nodes/index";


/**
 *  Pterodactyl
 * Main class to interact
 * @public
 */
export class Pterodactyl {
    apiKey: string | null;
    panelURL: string | null;    
    applicationKey: string | null;

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
    setApiKey(apiKey: string) {
        if (typeof apiKey !== "string") throw new Error("API key must be a string");

        this.apiKey = apiKey;
        return this
    }

    /**
     * Optionnal: Set the application key (client key)
     * @param key - The application key
     */
    setApplicationKey(key: string) {
        if (typeof key !== "string") throw new Error("Application key must be a string");

        this.applicationKey = key;
        return this
    }

    /**
     * Required: Set the panel URL (ex: https://portal.darkhosts.fr)
     * @param panelURL - The panel URL
     */

    setPanelURL(panelURL: string) {
        if (typeof panelURL !== "string") throw new Error("Panel URL must be a string");
        this.panelURL = panelURL;
        return this
    }

    /**
     * Get the servers manager
     */
    get servers(): typeof ServersManager.prototype {
        return new ServersManager(this.apiKey as string, this.panelURL as string, this.applicationKey)
    }

    /**
     * Get the users manager
     * @returns {UsersManager}
     */
    get users(): typeof UsersManager.prototype {
        return new UsersManager(this.apiKey as string, this.panelURL as string) 
    }

    /**
     * Get the nests manager
     */
    get nests(): typeof NestManager.prototype {
        return new NestManager(this.apiKey as string, this.panelURL as string)
    }

    /**
     * Get the locations manager
     */
    get locations(): typeof LocationsManager.prototype {
        return new LocationsManager(this.apiKey as string, this.panelURL as string)
    }

    /**
     * Get the nodes manager
     */
    get nodes(): typeof NodesManager.prototype {
        return new NodesManager(this.apiKey as string, this.panelURL as string);
    }
}