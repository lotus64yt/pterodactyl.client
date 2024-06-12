"use strict";
/**
 * NodeBuilder
 * @public
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeBuilder = void 0;
class NodeBuilder {
    "name";
    "location_id";
    "fqdn";
    "scheme";
    "memory";
    "memory_overallocate";
    "disk";
    "disk_overallocate";
    "upload_size";
    "daemon_sftp";
    "daemon_listen";
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
    setName(name) {
        if (typeof name !== "string")
            throw new Error("Name must be a string");
        this.name = name;
        return this;
    }
    setLocationID(locationID) {
        if (typeof locationID !== "number")
            throw new Error("Location ID must be a number");
        this.location_id = locationID;
        return this;
    }
    setFQDN(fqdn) {
        if (typeof fqdn !== "string")
            throw new Error("FQDN must be a string");
        this.fqdn = fqdn;
        return this;
    }
    setScheme(scheme) {
        if (typeof scheme !== "string")
            throw new Error("Scheme must be a string");
        this.scheme = scheme;
        return this;
    }
    setMemory(memory) {
        if (typeof memory !== "number")
            throw new Error("Memory must be a number");
        this.memory = memory;
        return this;
    }
    setMemoryOverallocate(memoryOverallocate) {
        if (typeof memoryOverallocate !== "number")
            throw new Error("Memory overallocate must be a number");
        this.memory_overallocate = memoryOverallocate;
        return this;
    }
    setDisk(disk) {
        if (typeof disk !== "number")
            throw new Error("Disk must be a number");
        this.disk = disk;
        return this;
    }
    setDiskOverallocate(diskOverallocate) {
        if (typeof diskOverallocate !== "number")
            throw new Error("Disk overallocate must be a number");
        this.disk_overallocate = diskOverallocate;
        return this;
    }
    setUploadSize(uploadSize) {
        if (typeof uploadSize !== "number")
            throw new Error("Upload size must be a number");
        this.upload_size = uploadSize;
        return this;
    }
    setDaemonSFTP(daemonSFTP) {
        if (typeof daemonSFTP !== "number")
            throw new Error("Daemon SFTP must be a number");
        this.daemon_sftp = daemonSFTP;
        return this;
    }
    setDaemonListen(daemonListen) {
        if (typeof daemonListen !== "number")
            throw new Error("Daemon listen must be a number");
        this.daemon_listen = daemonListen;
        return this;
    }
}
exports.NodeBuilder = NodeBuilder;
