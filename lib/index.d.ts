import { UsersManager } from "./Users/index";
import { ServersManager } from "./Servers/index";
import { NestManager } from "./Nests/index";
import { LocationsManager } from "./Locations/index";
import { NodesManager } from "./Nodes/index";
/**
 *  Pterodactyl
 * Main class to interact
 * @public
 */
export declare class Pterodactyl {
    apiKey: string | null;
    panelURL: string | null;
    applicationKey: string | null;
    constructor();
    /**
     * Required: Set the API key (admin panel key)
     * @param apiKey - The API key
     *
     */
    setApiKey(apiKey: string): this;
    /**
     * Optionnal: Set the application key (client key)
     * @param key - The application key
     */
    setApplicationKey(key: string): this;
    /**
     * Required: Set the panel URL (ex: https://portal.darkhosts.fr)
     * @param panelURL - The panel URL
     */
    setPanelURL(panelURL: string): this;
    /**
     * Get the servers manager
     */
    get servers(): typeof ServersManager.prototype;
    /**
     * Get the users manager
     * @returns {UsersManager}
     */
    get users(): typeof UsersManager.prototype;
    /**
     * Get the nests manager
     */
    get nests(): typeof NestManager.prototype;
    /**
     * Get the locations manager
     */
    get locations(): typeof LocationsManager.prototype;
    /**
     * Get the nodes manager
     */
    get nodes(): typeof NodesManager.prototype;
}
//# sourceMappingURL=index.d.ts.map