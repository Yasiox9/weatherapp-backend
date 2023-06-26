const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://yacinelariane:lebylkusdu92@cluster0.paptrih.mongodb.net/weatherApp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
