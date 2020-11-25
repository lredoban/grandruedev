const logger = require('consola').withScope('api')
const base = require('./base')

exports.recentProducts = () => {
  return base('Produits')
    .select({
      maxRecords: 5,
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
