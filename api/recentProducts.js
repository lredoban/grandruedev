const logger = require('consola').withScope('api')
const base = require('./base')

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
