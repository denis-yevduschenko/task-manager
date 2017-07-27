const request = require("request");

const base_url = "http://localhost:3000/";

describe("Server Test", function() {
    describe("GET /", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("listening port 3000", function(done) {
            request.get(base_url, function(error, response) {
                expect(+response.request.uri.port).toBe(process.env.PORT || 3000);
                done();
            });
        });

    });
});
