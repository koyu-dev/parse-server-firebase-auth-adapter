declare class FirebaseUtil {
    static createOptionsFromEnvironment(): {
        credential: string;
        databaseURL: string;
    };
    static fromEnvironmentOrDefault(options: {
        [key: string]: string;
    }, key: string, env: string, defaultValue: string): {
        [key: string]: string;
    };
}
export { FirebaseUtil };
