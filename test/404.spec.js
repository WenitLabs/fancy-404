/* eslint-env mocha */
const superagent = require('superagent')
const expect = require('expect.js')

const { NODE_ENV, HOST, PORT } = require('../src/app')

describe('404', function () {
  it('should respond to GET with 404 at root level', function (done) {
    superagent
      .get(`http://${HOST}:${PORT}`)
      .end((err, res) => {
        if (err && NODE_ENV !== 'test') { console.log(`err: ${JSON.stringify(err)}`) }
        expect(res.status).to.equal(404)
        done()
      })
  })
})
