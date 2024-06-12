import { LocationType } from "../Types/Location";
/**
 * Location
 * Class to manage locations
 * @public
 */
export declare class Location {
    apiKey: string;
    panelURL: string;
    object: string;
    id: number;
    short: string;
    long: string;
    updatedAt: string;
    createdAt: string;
    constructor(data: LocationType, apiKey: string, panelURL: string);
    delete(): Promise<boolean>;
    update(data: {
        short: string;
        long: string;
    }): Promise<Location>;
}
/**
 *  LocationsManager
 * Class to manage locations
 * @public
 */
export declare class LocationsManager {
    apiKey: string;
    panelURL: string;
    constructor(apiKey: string, panelURL: string);
    fetchAll(): Promise<Location[]>;
    fetch(id: number): Promise<Location>;
    create(long: string, short: string): Promise<Location>;
}
//# sourceMappingURL=index.d.ts.map