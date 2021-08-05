require('dotenv').config();
const mongoose = require('mongoose') ;

// Connection to mongoDB Atlas
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);


module.exports = mongoose.connection;