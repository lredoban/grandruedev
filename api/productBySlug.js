const logger = require('consola').withScope('api')
const base = require('./base')

exports.productBySlug = ({ slug }) => {
  return base('Produits')
    .select({ filterByFormula: `slug="${slug}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => record.fields)[0]
    })
    .catch((err) => {
      logger.error(err)
    })
}
