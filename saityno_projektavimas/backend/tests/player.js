const { iteratee } = require("lodash")

const {Assertion} = require('chai');
let chai = require('chai');  
let chainHttp = require('chai-http');

chai.should();
chai.use(chainHttp);


describe('Get users by page', () => {
    it('page returns 20 players', (done) => {
        const page = 1;
        chai.request('https://nba-modestas.herokuapp.com').get(`/players/${page}`).end((err, res) => {
            res.body.should.be.a('array');
            res.body.lenght.should.be.eq(20);
            done();
        })
    })
    it('returns all players', (done) => {
        chai.request('https://nba-modestas.herokuapp.com').get(`/filter/all`).end((err, res) => {
            res.body.should.be.a('array');
            res.body.lenght.should.be.above(100);
            done();
        })
    })
    it('returns specific player', (done) => {
        const id = '5f62427b92c3b8345482f4b2';
        chai.request('https://nba-modestas.herokuapp.com').get(`/id/${id}`).end((err, res) => {
            res.body.should.be.an('object');
            res.body.fullName.should.be.eql('OG Anunoby');
            done();
        })
    })
    it('returns 404 while geting player', (done) => {
        const id = '5f62427b92c3b8345482f4b245';
        chai.request('https://nba-modestas.herokuapp.com').get(`/id/${id}`).end((err, res) => {
            res.should.have.status(404);
            done();
        })
    })
})