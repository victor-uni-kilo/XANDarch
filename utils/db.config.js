// CHECK ENVIRONMENT
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'Connection error:'))
conn.once('open', () => { 
  console.log('Connected to Mongo') 
})

module.exports = conn
