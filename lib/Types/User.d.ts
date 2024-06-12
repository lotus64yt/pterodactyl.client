export interface UserType {
    _id: number;
    _username: string;
    _email: string;
    _firstName: string;
    _lastName: string;
    _language: string;
    _rootAdmin: boolean;
    "_2fa": boolean;
    _createdAt: string;
    _updatedAt: string;
    _apiKey: string;
    _panelURL: string;
}
export interface UserApiType {
    object: string;
    attributes: {
        id: number;
        username: string;
        email: string;
        first_name: string;
        external_id: string;
        uuid: string;
        last_name: string;
        language: string;
        root_admin: boolean;
        "2fa_enabled": boolean;
        created_at: string;
        updated_at: string;
        apiKey: string;
        panelURL: string;
    };
}
export interface UserApiTypeWithoutAttributes {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    external_id: string;
    uuid: string;
    language: string;
    root_admin: boolean;
    "2fa_enabled": boolean;
    created_at: string;
    updated_at: string;
    apiKey: string;
    panelURL: string;
}
//# sourceMappingURL=User.d.ts.map