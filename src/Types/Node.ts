export interface NodeType {
    object: string;
    attributes: {
        "id": number,
        "uuid": string,
        "public": boolean,
        "name": string,
        "description": string,
        "location_id": number,
        "fqdn": string,
        "scheme": string,
        "behind_proxy": boolean,
        "maintenance_mode": boolean,
        "memory": number,
        "memory_overallocate": number,
        "disk": number,
        "disk_overallocate": number,
        "upload_size": number,
        "daemon_listen": number,
        "daemon_sftp": number,
        "daemon_base": string,
        "created_at": string,
        "updated_at": string
    }
}