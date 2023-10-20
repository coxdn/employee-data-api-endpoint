const { types } = require('pg')
const pgp = require('pg-promise')()
const config = require('../config/config')

types.setTypeParser(1700, x => parseFloat(x))

const db = pgp(config.db)

module.exports = db