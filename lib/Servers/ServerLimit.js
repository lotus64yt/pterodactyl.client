"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLimits = void 0;
class ServerLimits {
    data;
    constructor(data) {
        this.data = data;
    }
    get memory() {
        return this.data.attributes.memory;
    }
    get swap() {
        return this.data.attributes.swap;
    }
    get disk() {
        return this.data.attributes.disk;
    }
    get io() {
        return this.data.attributes.io;
    }
    get cpu() {
        return this.data.attributes.cpu;
    }
}
exports.ServerLimits = ServerLimits;
