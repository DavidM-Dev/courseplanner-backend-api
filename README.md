# Courseplanner Serverless Backend API

This repo contains all of the backend logic for my new course planning app (final name TBD).

All resources are stored under the `functions/` folder.


## Reference

I'm not an expert in GraphQL, so I've been using this blog as a rough guide: https://www.robinwieruch.de/graphql-apollo-server-tutorial


## Testing and Deploy
To test locally, run
```
cd functions
npm run serve
```
Then visit http://localhost:5000/courseplanner-app/us-central1/api/graphql to use the interactive graphql playground.


To deploy to production, run
```
cd functions
firebase login
firebase deploy
```
You can then send all queries to https://us-central1-courseplanner-app.cloudfunctions.net/api/graphql (no graphql playground available, unfortunately 😔).

