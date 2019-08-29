import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import cors from 'cors';
import * as admin from 'firebase-admin';

function configureServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      let db = admin.firestore();
      return { db }
    }
  });
  server.applyMiddleware({ app });

  return app;
}

export { configureServer };
