const logger = require('consola').withScope('api')
const { productAttrFromRecord } = require('../plugins/product')
const base = require('./base')

exports.productsBy = ({ key, limit = 100, param }) => {
  return base('Produits')
    .select({
      filterByFormula: `${key}="${param}"`,
      pageSize: parseInt(limit)
    })
    .firstPage()
    .then((records) => {
      return records.map(productAttrFromRecord)
    })
    .catch((err) => {
      logger.error(err)
    })
}
