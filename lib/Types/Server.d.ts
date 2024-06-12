export interface ServerType {
    object: string;
    attributes: {
        id: number;
        identifier: string;
        external_id: string;
        uuid: string;
        suspended: boolean;
        name: string;
        description: string;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
        };
        user: number;
        egg: number;
        docker_image: string;
        startup: string;
        environment: object;
        feature_limits: {
            databases: number;
            backups: number;
        };
        allocation: {
            default: number;
        };
    };
}
//# sourceMappingURL=Server.d.ts.map