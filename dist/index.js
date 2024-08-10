"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuth = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const node_1 = __importDefault(require("parse/node"));
class FirebaseAuth {
    constructor() {
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS == null) {
            throw new Error('GOOGLE_APPLICATION_CREDENTIALS is required in the environment variables.');
        }
        this.app = (0, app_1.getApps)().length == 0 ? (0, app_1.initializeApp)() : (0, app_1.getApp)();
        this.auth = (0, auth_1.getAuth)(this.app);
    }
    validateAuthData(authData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = new FirebaseAuth();
                const decodedToken = yield auth.auth.verifyIdToken(authData.access_token);
                if (decodedToken && decodedToken.uid === authData.id) {
                    return;
                }
                else {
                    throw new node_1.default.Error(node_1.default.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');
                }
            }
            catch (error) {
                throw new node_1.default.Error(node_1.default.Error.OBJECT_NOT_FOUND, `Firebase auth is invalid for this user. ${error.message}`);
            }
        });
    }
    validateAppId() {
        return Promise.resolve();
    }
}
exports.FirebaseAuth = FirebaseAuth;
exports.default = FirebaseAuth;
