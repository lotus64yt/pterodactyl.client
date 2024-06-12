export interface VariableType {
    object: string;
    attributes: {
        name: string;
        description: string;
        string: string;
        default_value: string;
        server_value: string;
        env_variable: string;
        is_editable: boolean;
        rules: string
    }
}