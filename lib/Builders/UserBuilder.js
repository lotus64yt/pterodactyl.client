"use strict";
/**
 * UserBuilder class
 * @public
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBuilder = void 0;
class UserBuilder {
    username;
    password;
    email;
    firstName;
    lastName;
    lang;
    constructor() {
        this.username = null;
        this.password = null;
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.lang = null;
    }
    setUsername(username) {
        this.username = username;
        return this;
    }
    setPassword(password) {
        this.password = password;
        return this;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    setFirstName(firstName) {
        this.firstName = firstName;
        return this;
    }
    setLastName(lastName) {
        this.lastName = lastName;
        return this;
    }
    setLang(lang) {
        this.lang = lang;
        return this;
    }
}
exports.UserBuilder = UserBuilder;
