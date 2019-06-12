const mongoose = require('mongoose');

const dbUser = 'security';
const dbPassword = 'security';
const dbName = 'security';

const mongoUri = 'mongodb+srv://security:security@cluster0-y36d0.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri);
// mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error:'));
db.once('open', () => {
  console.log(`mongoDB connection success: ${mongoUri}`);
});
