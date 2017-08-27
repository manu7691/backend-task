// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('testing endpoint', () => {
  
  describe('/GET Top Contributors', () => {
      let token;
        beforeEach(function(done){
            chai.request(server)
            .get('/token')
            .end((err, res) => {
                token = res.body.token;
            done();
            });
        });
        it('it should GET Authentication Error', (done) => {
            chai.request(server)
                .get('/top-contributors/Murcia')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.message.should.contains('No token provided. Get one in /token');
                done();
                });
        });
        it('it should GET TOP50 in Almeria', (done) => {
            chai.request(server)
                .get('/top-contributors/Almería?top=50')
                .set('authorization',`Bearer ${token}`)
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
                .set('authorization',`Bearer ${token}`)
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
            .set('authorization',`Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(100);
                done();
            });
        });
        it('it should GET TOP150 in Madrid', (done) => {
        chai.request(server)
            .get('/top-contributors/Madrid?top=150')
            .set('authorization',`Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(150);
                done();
            });
        });
  });
});