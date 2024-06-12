/**
 * NodeBuilder
 * @public
 */
export declare class NodeBuilder {
    "name": string | null;
    "location_id": number | null;
    "fqdn": string | null;
    "scheme": string | null;
    "memory": number | null;
    "memory_overallocate": number | null;
    "disk": number | null;
    "disk_overallocate": number | null;
    "upload_size": number | null;
    "daemon_sftp": number | null;
    "daemon_listen": number | null;
    constructor();
    setName(name: string): this;
    setLocationID(locationID: number): this;
    setFQDN(fqdn: string): this;
    setScheme(scheme: string): this;
    setMemory(memory: number): this;
    setMemoryOverallocate(memoryOverallocate: number): this;
    setDisk(disk: number): this;
    setDiskOverallocate(diskOverallocate: number): this;
    setUploadSize(uploadSize: number): this;
    setDaemonSFTP(daemonSFTP: number): this;
    setDaemonListen(daemonListen: number): this;
}
//# sourceMappingURL=NodeBuilder.d.ts.map