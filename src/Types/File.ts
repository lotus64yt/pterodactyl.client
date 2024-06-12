export interface FileType {
    object: string;
    attributes: {
        name: string;
        mode: string;
        size: number;
        is_file: boolean;
        is_symlink: boolean;
        is_editable: boolean;
        mime: string;
        created_at: string;
        modified_at: string;
    }
}