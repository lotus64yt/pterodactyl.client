export interface BackupType {
    object: string;
    attributes: {
        name: string;
        uuid: string;
        ignored_files: string[];
        sha256_hash: string;
        bytes: number;
        created_at: string;
        completed_at: string;
    };
}
//# sourceMappingURL=Backup.d.ts.map