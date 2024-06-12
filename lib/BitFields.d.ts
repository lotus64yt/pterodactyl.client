/**
 * BitField class for managing permissions
 * @public
 */
declare const ServerUserPermissions: {
    Control: {
        Console: string;
        Start: string;
        Stop: string;
        Restart: string;
    };
    User: {
        Create: string;
        Update: string;
        Delete: string;
        Read: string;
    };
    File: {
        Create: string;
        Read: string;
        Update: string;
        Delete: string;
        Archive: string;
        SFTP: string;
    };
    Backup: {
        Create: string;
        Read: string;
        Delete: string;
        Update: string;
        Download: string;
    };
    Allocation: {
        Update: string;
    };
    Startup: {
        Update: string;
        Read: string;
    };
    Database: {
        Create: string;
        Read: string;
        Update: string;
        Delete: string;
        ViewPassword: string;
    };
    Schedule: {
        Create: string;
        Read: string;
        Update: string;
        Delete: string;
    };
    Settings: {
        Rename: string;
        Reinstall: string;
    };
    Websocket: {
        Connect: string;
    };
    All: string[];
};
export { ServerUserPermissions };
//# sourceMappingURL=BitFields.d.ts.map