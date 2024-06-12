/**
 * ServerBuilder
 * @public
 */
export declare class ServerBuilder {
    name: string | null;
    description: string | null;
    limits: {
        memory: number | null;
        swap: number | null;
        disk: number | null;
        io: number | null;
        cpu: number | null;
    };
    user: number | null;
    egg: number | null;
    docker_image: string | null;
    startup: string | null;
    environment: object;
    feature_limits: {
        databases: number | null;
        backups: number | null;
    };
    allocation: {
        default: number | null;
    };
    constructor();
    setName(name: string): this;
    setDescription(description: string): this;
    setLimits(limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    }): this;
    setLimitsMemory(memory: number): this;
    setLimitsSwap(swap: number): this;
    setLimitsDisk(disk: number): this;
    setLimitsIO(io: number): this;
    setLimitsCPU(cpu: number): this;
    setUser(user: number): this;
    setEgg(egg: number): this;
    setDockerImage(docker_image: string): this;
    setStartup(startup: string): this;
    setEnvironment(environment: {
        [key: string]: string;
    }): this;
    setFeatureLimits(feature_limits: {
        databases: number;
        backups: number;
    }): this;
    setFeatureLimitsDatabases(databases: number): this;
    setFeatureLimitsBackups(backups: number): this;
    setAllocation(allocation: {
        default: number;
    }): this;
    setAllocationDefault(defaultAllocation: number): this;
}
//# sourceMappingURL=ServerBuilder.d.ts.map