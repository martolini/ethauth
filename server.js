let {
  checkSig,
  generateSentenceAndUuid,
  getSentenceFromUuid,
  deleteUuid
} = require('./helpers');
const cors = require('cors')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { Map } = require('immutable');
const admin = require('firebase-admin');

app.use(bodyParser.json());
app.use(cors());

app.post('/auth', (req, res) => {
  const { sig, owner, uuid, provider, key } = req.body;
  const result = checkSig(sig, owner, uuid);
  if (result.error) {
    res.status(result.code).send(result.error)
  } else {
    switch(provider) {
      case 'firebase':
        admin.auth().createCustomToken(result.address)
          .then(token => {
            res.json(Object.assign({}, result, { token }))
          }).catch(err => res.status(500).send(err));
        break;
      case 'jwt':
        let token = jwt.sign({ user: result.addr }, 'asecret', { expiresIn: '1d' });
        res.json(Object.assign({}, result, { token }));
        break;
      default:
        res.json(result);
        break;
    }
  }
});

app.get('/sentence', (req, res) => {
  const data = generateSentenceAndUuid();
  res.json(data);
})

module.exports = app
