const express = require('express'); 
const {ApolloServer} = require('apollo-server-express') 
const logger = require('morgan') 
const path = require('path') 
const connectDb = require('./config/connection') 
const { typeDefs, resolvers } = require('./schemas') 
const { authMiddleware } = require('./utils/auth') 

const app = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  
server.applyMiddleware({ app });

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger('dev'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

connectDb()
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}!`);
});
