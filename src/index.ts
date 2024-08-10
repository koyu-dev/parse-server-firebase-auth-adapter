import { initializeApp, App } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';
import { Auth } from "firebase-admin/lib/auth/auth";
import Parse from "parse/node";

export class FirebaseAuth {
    app: App;
    auth: Auth;
    constructor() {
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS == null) {
            throw new Error('GOOGLE_APPLICATION_CREDENTIALS is required in the environment variables.');
        }
        this.app = initializeApp();
        this.auth = getAuth(this.app);
    }

    async validateAuthData(authData: {id: string, access_token: string}, options: any) {
        try {
            const auth = new FirebaseAuth();
            const decodedToken = await auth.auth.verifyIdToken(authData.access_token)
            if (decodedToken && decodedToken.uid === authData.id) {
                return;                    
            } else {
                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');
            }
        } catch (error) {
            throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `Firebase auth is invalid for this user. ${(error as Error).message}`);
        }
    }

    validateAppId() {
        return Promise.resolve();
    }
}

export default FirebaseAuth;
