require('dotenv').config()
const logger = require('consola').withScope('api')

const Airtable = require('airtable')
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base('appRq445lj2z1F2Zw')

exports.categories = () => {
  return base('Categories')
    .select()
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        slug: record.fields.slug,
        name: record.fields.name,
        imagePreview: record.fields.imagePreview[0].url
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
