const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');

describe('API calls', () => {
  it('GET /sentence', done => {
    request(server)
      .get('/sentence')
      .expect(200)
      .end((err, res) => {
        if (err)
          return done(err);
        expect(res.body.uuid).to.be.ok;
        expect(res.body.sentence).to.be.ok;
        done()
      });
  });
});
