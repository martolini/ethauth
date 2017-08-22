if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load(); // load .env into process.env
}
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-pk.json');
if (process.env.DATABASE_URL && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: process.env.DATABASE_URL
  });
}

