const logger = require('consola').withScope('api')
const base = require('./base')

exports.productBySlug = ({ slug }) => {
  return base('Produits')
    .select({ filterByFormula: `slug="${slug}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        ...record.fields,
        id: record.id,
        store: record.fields.store[0],
        storeLogo: record.fields.storeLogo[0].url,
        storeAddress: `${record.fields.storeCity[0]} (${record.fields.storeZipCode[0]})`
      }))[0]
    })
    .catch((err) => {
      logger.error(err)
    })
}
