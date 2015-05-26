'use strict';

var unassertify = require('..');
var fs = require('fs');
var Stream = require('stream');
var assert = require('assert');


describe('do nothing if debug: true', function() {
    var stream = unassertify(
        '/absolute/path/to/test/fixtures/func/fixture.js',
        {
            _flags: {
                entries: [
                    './test/fixtures/func/fixture.js'
                ],
                debug: true
            }
        });
    
    it('should return a stream', function() {
        assert(stream instanceof Stream);
    });
    
    it('should not transform', function(done) {
        var output = '', file;
        stream.on('data', function(buf) {
            output += buf;
        });
        stream.on('end', function() {
            var expected = fs.readFileSync('test/fixtures/func/fixture.js', 'utf8');
            assert.equal(output, expected);
            done();
        });
        file = fs.createReadStream('test/fixtures/func/fixture.js');
        file.pipe(stream);
    });
});
