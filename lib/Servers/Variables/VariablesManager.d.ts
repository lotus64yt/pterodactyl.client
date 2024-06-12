import { Variable } from "./Variable";
import { ServerType } from "../../Types/Server";
export declare class VariablesManager {
    apiKey: string;
    panelURL: string;
    server: ServerType;
    appKey: string;
    constructor(server: ServerType, apiKey: string, panelURL: string, appKey: string);
    fetchAll(): Promise<Variable[]>;
    fetchByName(name: string): Promise<Variable>;
    fetchByEnvVariable(envVariable: string): Promise<Variable>;
}
//# sourceMappingURL=VariablesManager.d.ts.map