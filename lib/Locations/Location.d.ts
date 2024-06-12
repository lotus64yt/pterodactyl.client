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
//# sourceMappingURL=Location.d.ts.map