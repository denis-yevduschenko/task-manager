const request = require('request');

const cookie = 'token=%242a%2410%24O%2FGTtqRSOEy3dkDer7ioX.3vC2WtKOUHkbAvg0PrYO0KJcFh%2FPnzy';
const endpoint = 'http://localhost:3000/api';

describe('users', function () {
    it('should return 403 response code if user isn\'t authenticated', function (done) {
        request.get(endpoint + "/tasks", function (error, response) {
            expect(response.statusCode).toEqual(403);
            done();
        });
    });

    it('should return 200 response code if user is authenticated', function (done) {
        let options = {
            url: endpoint + "/tasks",
            headers: {
                'User-Agent': 'request',
                'Cookie' : cookie
            }
        };
        function callback(error, response, body) {
            expect(response.statusCode).toEqual(200);
            done();
        }
        request(options, callback);
    });

});
