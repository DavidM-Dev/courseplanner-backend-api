import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import cors from 'cors';
import * as admin from 'firebase-admin';

const extractPrivateId = async (req: express.Request) => {
  const providedToken = req.headers['token'];
  if(typeof(providedToken) !== 'string') throw new AuthenticationError('no idToken header provided');
  try {
    return (await admin.auth().verifyIdToken(providedToken)).uid;
  } catch(e) {
    throw new AuthenticationError('authentication invalid');
  }
}

function configureServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }): Promise<Context> => {
      const db = admin.firestore();
      const userId = await extractPrivateId(req);
      return { db, userId };
    }
  });
  server.applyMiddleware({ app });

  return app;
}

export { configureServer };
