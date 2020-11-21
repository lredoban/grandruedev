require('dotenv').config()

const Airtable = require('airtable')
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base('appRq445lj2z1F2Zw')

module.exports = base
