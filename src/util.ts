'use strict';

class FirebaseUtil {
    static createOptionsFromEnvironment(): {credential: string, databaseURL: string} {
        return {
            credential: process.env['FIREBASE_SERVICE_ACCOUNT_KEY']!,
            databaseURL: process.env['FIREBASE_DATABASE_URL']!
        };
    }

    static fromEnvironmentOrDefault(options: {[key: string]: string}, key: string, env: string, defaultValue: string) {
        options[key] = options[key] || process.env[env] || defaultValue;
        return options;
    }
}

export {
    FirebaseUtil
};