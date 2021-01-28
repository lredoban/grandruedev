const logger = require('consola').withScope('api')
const { productAttrFromRecord } = require('../plugins/product')
const base = require('./base')

exports.productBySlug = ({ slug }) => {
  return base('Produits')
    .select({ filterByFormula: `slug="${slug}"` })
    .firstPage()
    .then((records) => {
      return records.map(productAttrFromRecord)[0]
    })
    .catch((err) => {
      logger.error(err)
    })
}
