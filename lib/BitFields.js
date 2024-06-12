"use strict";
/**
 * BitField class for managing permissions
 * @public
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUserPermissions = void 0;
const ServerUserPermissions = {
    Control: {
        Console: "control.console",
        Start: "control.start",
        Stop: "control.stop",
        Restart: "control.restart",
    },
    User: {
        Create: "user.create",
        Update: "user.update",
        Delete: "user.delete",
        Read: "user.read",
    },
    File: {
        Create: "file.create",
        Read: "file.read",
        Update: "file.update",
        Delete: "file.delete",
        Archive: "file.archive",
        SFTP: "file.sftp",
    },
    Backup: {
        Create: "backup.create",
        Read: "backup.read",
        Delete: "backup.delete",
        Update: "backup.update",
        Download: "backup.download",
    },
    Allocation: {
        Update: "allocation.update",
    },
    Startup: {
        Update: "startup.update",
        Read: "startup.read",
    },
    Database: {
        Create: "database.create",
        Read: "database.read",
        Update: "database.update",
        Delete: "database.delete",
        ViewPassword: "database.view_password",
    },
    Schedule: {
        Create: "schedule.create",
        Read: "schedule.read",
        Update: "schedule.update",
        Delete: "schedule.delete",
    },
    Settings: {
        Rename: "settings.rename",
        Reinstall: "settings.reinstall",
    },
    Websocket: {
        Connect: "websocket.connect",
    },
    All: [
        "control.console",
        "control.start",
        "control.stop",
        "control.restart",
        "user.create",
        "user.update",
        "user.delete",
        "user.read",
        "file.create",
        "file.read",
        "file.update",
        "file.delete",
        "file.archive",
        "file.sftp",
        "backup.create",
        "backup.read",
        "backup.delete",
        "backup.update",
        "backup.download",
        "allocation.update",
        "startup.update",
        "startup.read",
        "database.create",
        "database.read",
        "database.update",
        "database.delete",
        "database.view_password",
        "schedule.create",
        "schedule.read",
        "schedule.update",
        "schedule.delete",
        "settings.rename",
        "settings.reinstall",
        "websocket.connect"
    ]
};
exports.ServerUserPermissions = ServerUserPermissions;
