const dotEnv = require('dotenv')

dotEnv.config({
  silent: true
})

require('./src/app')
