var request = require('supertest');
var should = require('should');
var app = require('../app');

describe('Hello endpoint', function () {

    it('should say hello to stranger', function (done) {

        request(app)
            .get('/hello')
            .send()
            .expect(200)
            .expect('Hello Stranger', done);
    });
    it('should say hello to John', function (done) {
        request(app)
            .get('/hello?name=John')
            .send()
            .expect(200)
            .expect('Hello John', done);
    });

});

