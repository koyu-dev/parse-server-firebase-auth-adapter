import { App } from "firebase-admin/app";
import { Auth } from "firebase-admin/lib/auth/auth";
export declare class FirebaseAuth {
    app: App;
    auth: Auth;
    constructor();
    validateAuthData(authData: {
        id: string;
        access_token: string;
    }, options: any): Promise<void>;
    validateAppId(): Promise<void>;
}
export default FirebaseAuth;
