import { NestType } from "src/Types/Nest";
/**
 *  Egg
 * Class to manage eggs
 */
export declare class Egg {
    apiKey: string;
    panelURL: string;
    nestID: string;
    "type": string;
    "id": number;
    "uuid": string;
    "name": string;
    "nest": NestType;
    "author": string;
    "description": string;
    "docker_image": string;
    "config": any;
    "startup": string;
    "script": {
        "privileged": boolean;
        "install": string;
        "entry": string;
        "container": string;
        "extends": null | string;
    };
    "createdAt": string;
    "updatedAt": string;
    "relationships": any;
    constructor(data: any, apiKey: string, panelURL: string, nestID: string);
}
//# sourceMappingURL=Egg.d.ts.map