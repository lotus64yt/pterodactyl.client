import { ServerType } from "../../Types/Server";
import { VariableType } from "../../Types/Variable";
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
//# sourceMappingURL=Variable.d.ts.map