if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load(); // load .env into process.env
}
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FB_PK)),
  databaseUrl: process.env.DATABASE_URL
});
