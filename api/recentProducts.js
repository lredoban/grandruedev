const logger = require('consola').withScope('api')
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
      return records.map((record) => ({
        slug: record.fields.slug,
        name: record.fields.name,
        price: record.fields.price,
        unit: record.fields.unit,
        storeAddress: `${record.fields.storeCity[0]} (${record.fields.storeZipCode[0]})`,
        storeName: record.fields.storeName[0],
        imgUrl: record.fields.images[0].url
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
