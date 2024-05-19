'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseUtil = void 0;
class FirebaseUtil {
    static createOptionsFromEnvironment() {
        return {
            credential: process.env['FIREBASE_SERVICE_ACCOUNT_KEY'],
            databaseURL: process.env['FIREBASE_DATABASE_URL']
        };
    }
    static fromEnvironmentOrDefault(options, key, env, defaultValue) {
        options[key] = options[key] || process.env[env] || defaultValue;
        return options;
    }
}
exports.FirebaseUtil = FirebaseUtil;
