require('dotenv').config()
const logger = require('consola').withScope('api')

const Airtable = require('airtable')
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base('appRq445lj2z1F2Zw')

exports.recentProducts = () => {
  return base('Produits')
    .select({
      maxRecords: 5,
      view: 'Tous les produits'
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        slug: record.fields.ref.toLowerCase(),
        name: record.fields.name,
        price: record.fields.price,
        unit: record.fields.unit,
        storeAddress: record.fields.storeAddress[0],
        storeName: record.fields.storeName[0],
        imgUrl: record.fields.images[0].url
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
