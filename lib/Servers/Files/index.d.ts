import { FileType } from "../../Types/File";
import { ServerType } from "../../Types/Server";
/**
 * File
 * Class of a server's file
 * @public
 */
export declare class File {
    server: ServerType;
    type: string;
    name: string;
    mode: string;
    size: number;
    isFile: boolean;
    isSymlink: boolean;
    isEditable: boolean;
    mimeType: string;
    createdAt: string;
    modifiedAt: string;
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, data: FileType, apiKey: string, panelURL: string, appKey: string);
    rename(root: string, newName: string): Promise<boolean>;
    copy(location: string): Promise<boolean>;
    write(path: string, content: string): Promise<boolean>;
    delete(root: string, files: string[]): Promise<boolean>;
}
/**
 * Files Manager
 * Class for manages files of a server
 * @public
 */
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
//# sourceMappingURL=index.d.ts.map