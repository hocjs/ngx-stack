var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Container unit tests:', () => {
    it('Should create a Container instance', (done: Function) => {
        api.post('/containers').send({}).expect(200, done);
    });
});
