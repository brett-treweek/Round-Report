const express = require('express'); 
const { ApolloServer } = require('apollo-server-express') 
const { typeDefs, resolvers } = require('./schemas') 
const db = require('./config/connection'); 
const { authMiddleware } = require('./utils/auth');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// Creating new apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  // Applying middleware to express and applying express as middleware to apollo server.
  server.applyMiddleware({ app });
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  
  // Setting static file locations for heroku to work.
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
  };

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Listening on ports
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
