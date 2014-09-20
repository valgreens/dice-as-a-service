var Lab = require('lab'),
    server = require("../");

var lab = exports.lab = Lab.script();

var describe = lab.describe,
    it = lab.it,
    before = lab.before,
    after = lab.after,
    expect = Lab.expect;

describe('Dice-as-a-Service', function () {

    describe('API /execute/{command}', function () {

        it('executes a command in dice notation and gives a result', function (done) {
            var options = {
                method: 'GET',
                url: '/execute/4d20'
            };

            server.inject(options, function (response) {
                expect(response.statusCode).to.equal(200);
                expect(response.result.command).to.equal('4d20');
                done();
            });
        });

    });

    describe('API /parse/{command}', function () {

        it('parses a command in dice notation', function (done) {
            var options = {
                method: 'GET',
                url: '/parse/4d20'
            };

            server.inject(options, function (response) {
                expect(response.statusCode).to.equal(200);
                expect(response.result.times).to.equal(4);
                expect(response.result.faces).to.equal(20);
                done();
            });
        });

    });

    describe('API /roll/{faces}', function () {

        it('rolls a N-faces dice', function (done) {
            var options = {
                method: "GET",
                url: "/roll/6"
            };

            server.inject(options, function(response) {
                expect(response.statusCode).to.equal(200);
                expect(response.result).to.be.a('number');
                done();
            });
        });

        it('does not accept string as param', function (done) {
            var options = {
                method: "GET",
                url: "/roll/six"
            };

            server.inject(options, function(response) {
                expect(response.statusCode).to.equal(400);
                expect(response.result.message).to.equal('faces must be a number');
                done();
            });
        });

    });

});
