const request = require('request');
let User = require('../models/user');

const endpoint = 'http://localhost:3000/users';

describe('users', function () {
    it('should return 200 response code', function (done) {
        request.post(endpoint + "/register", {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should return 400 response code with empty body', function (done) {
        request.post(endpoint + "/login", {json: true, body: {}}, function (error, response) {
            expect(response.statusCode).toEqual(400);
            done();
        });
    });

    it('should return 401 response code with wrong data', function (done) {
        request.post(endpoint + "/login", {json: true,  body: {
            username: "wrongName",
            password: "wrongPassword"
        }}, function (error, response) {
            expect(response.statusCode).toEqual(401);
            done();
        });
    });

    it('should fail on get', function (done) {
        request.get(endpoint + "/register", function (error, response) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });

    it('should register new user', function (done) {
        request.post(endpoint + "/register",
            {json: true, body: {
                name: "test",
                email: "email@i.ua",
                username: "testRest",
                password: "123456",
                confirm: "123456"
            }}, function (error, response, body) {
                expect(body.username).toEqual("testRest");
                let query = {username: "testRest"};
                User.find(query).remove(function () {
                    done();
                });
            });

    });

    it('should return validation message', function (done) {
        request.post(endpoint + "/register",
            {json: true, body: {
                name: "test",
                email: "email@i.ua",
                username: "testRest",
                password: "123456",
                confirm: "654321"
            }}, function (error, response, body) {
                expect(body.indexOf("Passwords do not match")).not.toEqual(-1);
                done();
            });
    });

    it('should register new user', function (done) {
        request.post(endpoint + "/register",
            {json: true, body: {
                name: "test",
                email: "email",
                username: "testRest",
                password: "123456",
                confirm: "123456"
            }}, function (error, response, body) {
                expect(body.indexOf("Email is not valid")).not.toEqual(-1);
                done();
            });

    });

    it('should login user if he exists in db', function (done) {
        request.post(endpoint + "/login",
            {json: true, body: {
                username: "admin",
                password: "admin1"
            }}, function (error, response, body) {
                expect(body.username).toEqual("admin");
                done();
            });

    });

    it('shouldn\'t login user if he doesn\'t exist in db', function (done) {
        request.post(endpoint + "/login",
            {json: true, body: {
                username: "wrongName",
                password: "wrongPassword"
            }}, function (error, response, body) {
                expect(body).toEqual("Unauthorized");
                done();
            });

    });

    it('should return error', function (done) {
        request.post(endpoint + "/login",
            {json: true, body: {
                username: "wrongName"
            }}, function (error, response, body) {
                expect(body).toEqual("Bad Request");
                done();
            });

    });

    it('should return error', function (done) {
        request.post(endpoint + "/login",
            {json: true, body: {
                password: "234234"
            }}, function (error, response, body) {
                expect(body).toEqual("Bad Request");
                done();
            });
    });

    it('should return error', function (done) {
        request.post(endpoint + "/login",
            {json: true, body: {
            }}, function (error, response, body) {
                expect(body).toEqual("Bad Request");
                done();
            });
    });
});
