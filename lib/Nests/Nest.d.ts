import { NestType } from "../Types/Nest";
import { EggsManager } from "./Eggs/index";
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
//# sourceMappingURL=Nest.d.ts.map