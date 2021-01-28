const logger = require('consola').withScope('api')
const { productAttrFromRecord } = require('../plugins/product')
const base = require('./base')

exports.recentProducts = (options) => {
  const maxRecords =
    !!options && !!options.maxRecords ? parseInt(options.maxRecords) : 5
  return base('Produits')
    .select({
      maxRecords,
      view: 'Tous les produits',
      sort: [{ field: 'createdAt', direction: 'desc' }]
    })
    .firstPage()
    .then((records) => {
      return records.map(productAttrFromRecord)
    })
    .catch((err) => {
      logger.error(err)
    })
}
