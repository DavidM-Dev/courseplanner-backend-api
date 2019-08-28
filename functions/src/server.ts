import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import cors from 'cors';


function configureServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  server.applyMiddleware({ app });

  return app;
}

export { configureServer };

