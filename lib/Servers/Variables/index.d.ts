import { ServerType } from "../../Types/Server";
import { VariableType } from "../../Types/Variable";
/**
 * Variable
 * Object of a server's variable
 */
export declare class Variable {
    server: ServerType;
    type: string;
    name: string;
    description: string;
    envVariable: string;
    defaultValue: string;
    serverValue: string;
    isEditable: boolean;
    rules: string;
    apiKey: string;
    panelURL: string;
    appKey: string;
    constructor(server: ServerType, data: VariableType, apiKey: string, panelURL: string, appKey: string);
    update(key: string, value: string): Promise<Variable>;
}
/**
 * Variables Manager
 * Class for manage the variables of a server
 * @public
 */
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
//# sourceMappingURL=index.d.ts.map