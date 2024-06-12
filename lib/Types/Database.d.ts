export interface DatabaseType {
    object: string;
    attributes: {
        id: number;
        host: {
            adress: string;
            port: number;
        };
        name: string;
        username: string;
        connection_from: string;
        max_connections: number;
    };
}
//# sourceMappingURL=Database.d.ts.map