require('dotenv').config();
const mongoose = require('mongoose') ;

// Connection to mongoDB Atlas
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log('Connected to Atlas DB');
};

module.exports = connectDB;