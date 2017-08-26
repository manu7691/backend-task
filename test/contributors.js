//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('testing endpoints', () => {
  
  describe('/GET Top Contributors', () => {
        it('it should GET TOP50 in Almeria', (done) => {
            chai.request(server)
                .get('/top-contributors/Almería?top=50')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(50);
                    res.body.should.contains('elhackaton');
                done();
                });
        });
        it('it should GET TOP50 in Almeria without top on the url', (done) => {
            chai.request(server)
                .get('/top-contributors/Almería')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(50);
                    res.body.should.contains('elhackaton');
                done();
                });
        });
        it('it should GET TOP100 in Barcelona', (done) => {
        chai.request(server)
            .get('/top-contributors/Barcelona?top=100')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(100);
                done();
            });
        });
        it('it should GET TOP150 in Madrid', (done) => {
        chai.request(server)
            .get('/top-contributors/Madrid?top=150')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(150);
                done();
            });
        });
  });
});
  