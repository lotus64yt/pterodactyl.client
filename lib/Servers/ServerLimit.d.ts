interface ServerLimitsData {
    attributes: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    };
}
export declare class ServerLimits {
    data: ServerLimitsData;
    constructor(data: ServerLimitsData);
    get memory(): number;
    get swap(): number;
    get disk(): number;
    get io(): number;
    get cpu(): number;
}
export {};
//# sourceMappingURL=ServerLimit.d.ts.map