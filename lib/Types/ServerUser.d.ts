export interface ServerUserType {
    object: string;
    attributes: {
        uuid: string;
        username: string;
        email: string;
        image: string;
        "2fa_enabled": boolean;
        created_at: string;
        permissions: string[];
    };
}
//# sourceMappingURL=ServerUser.d.ts.map