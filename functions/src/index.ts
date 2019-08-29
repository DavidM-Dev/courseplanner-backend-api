import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { configureServer } from "./server";


admin.initializeApp(functions.config().firebase);

const server = configureServer();
const api = functions.https.onRequest(server);

module.exports = { api };
