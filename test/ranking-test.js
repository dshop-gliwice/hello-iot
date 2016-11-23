var request = require('supertest');
var should = require('should');
var app = require('../app');

describe('Ranking endpoint', function () {

    it('should create 1st entry for Cindy', function (done) {

        request(app)
            .post('/ranking')
            .send({name:'Cindy'})
            .expect(200, done);
    });
    it('should create 2nd entry for Paul', function (done) {

        request(app)
            .post('/ranking')
            .send({name:'Paul'})
            .end(function(err,res){
                res.body.should.have.property('ranking',2);
                done();
            });
    });
    it('should return Cindy and Paul', function (done) {
        request(app)
            .get('/ranking')
            .send()
            .end(function(err, res){
                res.body[0].should.have.property('name','Cindy');
                res.body[1].should.have.property('name','Paul');
                done();
            });
    });
    it('should not create 3rd entry for Paul', function (done) {

        request(app)
            .post('/ranking')
            .send({name:'Paul'})
            .end(function(err,res){
                res.body.should.have.property('ranking',-1);
                done();
            });
    });

});

