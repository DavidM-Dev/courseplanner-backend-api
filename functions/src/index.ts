import * as functions from 'firebase-functions';
import { configureServer } from "./server";

const server = configureServer();
const api = functions.https.onRequest(server);

module.exports = { api };
