import { NestType } from "../Types/Nest";
import { EggsManager } from "./Eggs";
/**
 *  Nest
 * Manage nests
 */
export declare class Nest {
    apiKey: string;
    panelURL: string;
    type: string;
    id: string;
    uuid: string;
    author: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    constructor(data: NestType, apiKey: string, panelURL: string);
    get eggs(): EggsManager;
}
/**
 *  NestManager
 * Manage nests
 * @public
 */
export declare class NestManager {
    apiKey: string;
    panelURL: string;
    constructor(apiKey: string, panelURL: string);
    fetchAll(): Promise<Nest[]>;
    /**
     *
     * @param id - Nest ID
     */
    fetch(id: number): Promise<Nest>;
}
//# sourceMappingURL=index.d.ts.map