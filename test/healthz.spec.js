/* eslint-env mocha */
const superagent = require('superagent')
const expect = require('expect.js')

const { NODE_ENV, HOST, PORT } = require('../src/app')

describe('healthz', function () {
  it('should respond to GET with 200 at /healthz', function (done) {
    superagent
      .get(`http://${HOST}:${PORT}/healthz`)
      .end((err, res) => {
        if (err && NODE_ENV !== 'test') { console.log(`err: ${JSON.stringify(err)}`) }
        expect(res.status).to.equal(200)
        done()
      })
  })
})
