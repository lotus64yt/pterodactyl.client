import { NestType } from "./Nest";
import { ServerType } from "../Types/Server";

export interface EggType {
    object: string;
    attributes: {
        "id": number;
        "uuid": string;
        "name": string;
        "nest": number;
        "author": string;
        "description": string;
        "docker_image": string;
        "config": {
            "startup": {
                "done": string,
                "userInteraction": [
                    string
                ]
            },
            "stop": string,
            "logs": {
                "custom": boolean,
                "location": string
            },
            "extends": null | string,
        },
        "startup": string;
        "script": {
            "privileged": boolean,
            "install": string,
            "entry": string,
            "container": string,
            "extends": null | string,
        },
        "created_at": string,
        "updated_at": string,
        "relationships": {
            "nest": NestType,
            "servers": {
                "object": string,
                "data": {
                    object: string,
                    attributes: ServerType
                }[]
            }
        }
    }
}