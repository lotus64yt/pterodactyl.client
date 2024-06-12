"use strict";
/**
 * ServerBuilder
 * @public
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBuilder = void 0;
class ServerBuilder {
    name;
    description;
    limits;
    user;
    egg;
    docker_image;
    startup;
    environment;
    feature_limits;
    allocation;
    constructor() {
        this.name = null;
        this.description = null;
        this.limits = {
            memory: null,
            swap: null,
            disk: null,
            io: null,
            cpu: null
        };
        this.user = null;
        this.egg = null;
        this.docker_image = null;
        this.startup = null;
        this.environment = {};
        this.feature_limits = {
            databases: null,
            backups: null
        };
        this.allocation = {
            default: null
        };
    }
    setName(name) {
        if (typeof name !== "string")
            throw new Error("Name must be a string");
        this.name = name;
        return this;
    }
    setDescription(description) {
        if (typeof description !== "string")
            throw new Error("Description must be a string");
        this.description = description;
        return this;
    }
    setLimits(limits) {
        if (typeof limits !== "object")
            throw new Error("Limits must be an object");
        this.limits = limits;
        return this;
    }
    setLimitsMemory(memory) {
        if (typeof memory !== "number")
            throw new Error("Memory must be a number");
        this.limits.memory = memory;
        return this;
    }
    setLimitsSwap(swap) {
        if (typeof swap !== "number")
            throw new Error("Swap must be a number");
        this.limits.swap = swap;
        return this;
    }
    setLimitsDisk(disk) {
        if (typeof disk !== "number")
            throw new Error("Disk must be a number");
        this.limits.disk = disk;
        return this;
    }
    setLimitsIO(io) {
        if (typeof io !== "number")
            throw new Error("IO must be a number");
        this.limits.io = io;
        return this;
    }
    setLimitsCPU(cpu) {
        if (typeof cpu !== "number")
            throw new Error("CPU must be a number");
        this.limits.cpu = cpu;
        return this;
    }
    setUser(user) {
        if (typeof user !== "number")
            throw new Error("User must be a number");
        this.user = user;
        return this;
    }
    setEgg(egg) {
        if (typeof egg !== "number")
            throw new Error("Egg must be a number");
        this.egg = egg;
        return this;
    }
    setDockerImage(docker_image) {
        if (typeof docker_image !== "string")
            throw new Error("Docker image must be a string");
        this.docker_image = docker_image;
        return this;
    }
    setStartup(startup) {
        if (typeof startup !== "string")
            throw new Error("Startup must be a string");
        this.startup = startup;
        return this;
    }
    setEnvironment(environment) {
        if (typeof environment !== "object")
            throw new Error("Environment must be an object");
        this.environment = environment;
        return this;
    }
    setFeatureLimits(feature_limits) {
        if (typeof feature_limits !== "object")
            throw new Error("Feature limits must be an object");
        this.feature_limits = feature_limits;
        return this;
    }
    setFeatureLimitsDatabases(databases) {
        if (typeof databases !== "number")
            throw new Error("Databases must be a number");
        this.feature_limits.databases = databases;
        return this;
    }
    setFeatureLimitsBackups(backups) {
        if (typeof backups !== "number")
            throw new Error("Backups must be a number");
        this.feature_limits.backups = backups;
        return this;
    }
    setAllocation(allocation) {
        if (typeof allocation !== "object")
            throw new Error("Allocation must be an object");
        this.allocation = allocation;
        return this;
    }
    setAllocationDefault(defaultAllocation) {
        this.allocation.default = defaultAllocation;
        return this;
    }
}
exports.ServerBuilder = ServerBuilder;
