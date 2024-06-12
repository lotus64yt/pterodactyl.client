import { File } from "./File";
import { ServerType } from "../../Types/Server";
export declare class FilesManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchByName(name: string): Promise<File>;
    fetchList(directory?: string): Promise<File[]>;
    fetchContent(filePath: string): Promise<string>;
    generateDownloadLink(filePath: string): Promise<string>;
}
//# sourceMappingURL=FilesManager.d.ts.map