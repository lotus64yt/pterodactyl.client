import { FileType } from "../../Types/File";
import { ServerType } from "../../Types/Server";
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
//# sourceMappingURL=File.d.ts.map