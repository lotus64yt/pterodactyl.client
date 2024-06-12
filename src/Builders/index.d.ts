/**
 * UserBuilder class
 * @public
 */

export class UserBuilder {
    username: string | null;
    password: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    lang: string | null

    constructor () {
        this.username = null;
        this.password = null;
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.lang = null
    }

    setUsername (username: string) {
        this.username = username;
        return this;
    }

    setPassword (password: string) {
        this.password = password;
        return this;
    }

    setEmail (email: string) {
        this.email = email;
        return this;
    }

    setFirstName (firstName: string) {
        this.firstName = firstName;
        return this;
    }

    setLastName (lastName: string) {
        this.lastName = lastName;
        return this;
    }

    setLang(lang: string) {
        this.lang = lang
        return this
    }
}


/**
 * ServerBuilder
 * @public
 */

export class ServerBuilder {
    name: string| null;
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

    setName(name: string) {
        if (typeof name !== "string") throw new Error("Name must be a string");
        this.name = name;
        return this
    }

    setDescription(description: string) {
        if (typeof description !== "string") throw new Error("Description must be a string");
        this.description = description;
        return this
    }

    setLimits(limits: {
        memory: number;
        swap: number;
        disk: number;
        io: number;
        cpu: number;
    }) {
        if (typeof limits !== "object") throw new Error("Limits must be an object");
        this.limits = limits;
        return this
    }

    setLimitsMemory(memory: number) {
        if (typeof memory !== "number") throw new Error("Memory must be a number");
        this.limits.memory = memory;
        return this
    }

    setLimitsSwap(swap: number) {
        if (typeof swap !== "number") throw new Error("Swap must be a number");
        this.limits.swap = swap;
        return this
    }

    setLimitsDisk(disk: number) {
        if (typeof disk !== "number") throw new Error("Disk must be a number");
        this.limits.disk = disk;
        return this
    }

    setLimitsIO(io: number) {
        if (typeof io !== "number") throw new Error("IO must be a number");
        this.limits.io = io;
        return this
    }

    setLimitsCPU(cpu: number) {
        if (typeof cpu !== "number") throw new Error("CPU must be a number");
        this.limits.cpu = cpu;
        return this
    }

    setUser(user: number) {
        if (typeof user !== "number") throw new Error("User must be a number");
        this.user = user;
        return this
    }

    setEgg(egg: number) {
        if (typeof egg !== "number") throw new Error("Egg must be a number");
        this.egg = egg;
        return this
    }

    setDockerImage(docker_image: string) {
        if (typeof docker_image !== "string") throw new Error("Docker image must be a string");
        this.docker_image = docker_image;
        return this
    }

    setStartup(startup: string) {
        if (typeof startup !== "string") throw new Error("Startup must be a string");
        this.startup = startup;
        return this
    }

    setEnvironment(environment: {
        [key: string]: string;
    }) {
        if (typeof environment !== "object") throw new Error("Environment must be an object");
        this.environment = environment;
        return this
    }

    setFeatureLimits(feature_limits: {
        databases: number;
        backups: number;
    }) {
        if (typeof feature_limits !== "object") throw new Error("Feature limits must be an object");
        this.feature_limits = feature_limits;
        return this
    }

    setFeatureLimitsDatabases(databases: number) {
        if (typeof databases !== "number") throw new Error("Databases must be a number");
        this.feature_limits.databases = databases;
        return this
    }

    setFeatureLimitsBackups(backups: number) {
        if (typeof backups !== "number") throw new Error("Backups must be a number");
        this.feature_limits.backups = backups;
        return this
    }

    setAllocation(allocation: {
        default: number;
    }) {
        if (typeof allocation !== "object") throw new Error("Allocation must be an object");
        this.allocation = allocation;
        return this
    }

    setAllocationDefault(defaultAllocation: number) {
        this.allocation.default = defaultAllocation;
        return this
    }
}



/**
 * NodeBuilder
 * @public
 */

export class NodeBuilder {
    "name": string |null;
    "location_id": number |null;
    "fqdn": string |null;
    "scheme": string |null;
    "memory": number |null;
    "memory_overallocate": number |null;
    "disk": number |null;
    "disk_overallocate": number |null;
    "upload_size": number |null;
    "daemon_sftp": number |null;
    "daemon_listen": number |null;

    constructor() {
        this.name = null;
        this.location_id = null;
        this.fqdn = null;
        this.scheme = null;
        this.memory = null;
        this.memory_overallocate = null;
        this.disk = null;
        this.disk_overallocate = null;
        this.upload_size = null;
        this.daemon_sftp = null;
        this.daemon_listen = null;
    }

    setName(name: string) {
        if (typeof name !== "string") throw new Error("Name must be a string");
        this.name = name;
        return this
    }

    setLocationID(locationID: number) {
        if (typeof locationID !== "number") throw new Error("Location ID must be a number");

        this.location_id = locationID;
        return this
    }

    setFQDN(fqdn: string) {
        if (typeof fqdn !== "string") throw new Error("FQDN must be a string");

        this.fqdn = fqdn;
        return this
    }

    setScheme(scheme: string) {
        if (typeof scheme !== "string") throw new Error("Scheme must be a string");

        this.scheme = scheme;
        return this
    }

    setMemory(memory: number) {
        if (typeof memory !== "number") throw new Error("Memory must be a number");

        this.memory = memory;
        return this
    }

    setMemoryOverallocate(memoryOverallocate: number) {
        if (typeof memoryOverallocate !== "number") throw new Error("Memory overallocate must be a number");

        this.memory_overallocate = memoryOverallocate;
        return this
    }

    setDisk(disk: number) {
        if (typeof disk !== "number") throw new Error("Disk must be a number");

        this.disk = disk;
        return this
    }

    setDiskOverallocate(diskOverallocate: number) {
        if (typeof diskOverallocate !== "number") throw new Error("Disk overallocate must be a number");

        this.disk_overallocate = diskOverallocate;
        return this
    }

    setUploadSize(uploadSize: number) {
        if (typeof uploadSize !== "number") throw new Error("Upload size must be a number");

        this.upload_size = uploadSize;
        return this
    }

    setDaemonSFTP(daemonSFTP: number) {
        if (typeof daemonSFTP !== "number") throw new Error("Daemon SFTP must be a number");

        this.daemon_sftp = daemonSFTP;
        return this
    }

    setDaemonListen(daemonListen: number) {
        if (typeof daemonListen !== "number") throw new Error("Daemon listen must be a number");

        this.daemon_listen = daemonListen;
        return this
    }
}

export { ServerBuilder, UserBuilder, NodeBuilder }