import { initializeApp, App } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';
import { FirebaseUtil } from './util';
import { Auth } from "firebase-admin/lib/auth/auth";
import Parse from "parse/node";

export class FirebaseAuth {
    app: App;
    auth: Auth;
    constructor() {
        const options = FirebaseUtil.createOptionsFromEnvironment();
        this.app = initializeApp({
            credential: require(options.credential),
            databaseURL: options.databaseURL
        });
        this.auth = getAuth(this.app);
    }

    async validateAuthData(authData: {id: string, access_token: string}, options: any) {
        try {
            const decodedToken = await this.auth.verifyIdToken(authData.access_token)
            if (decodedToken && decodedToken.uid == authData.id) {
                return;                    
            } else {
                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');
            }
        } catch (error) {
            throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth is invalid for this user.');
        }
    }

    validateAppId() {
        return Promise.resolve();
    }
}

export default FirebaseAuth;
