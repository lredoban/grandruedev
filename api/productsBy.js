const logger = require('consola').withScope('api')
const base = require('./base')

exports.productsBy = ({ key, param }) => {
  return base('Produits')
    .select({ filterByFormula: `${key}="${param}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => {
        return {
          slug: record.fields.slug,
          name: record.fields.name,
          price: record.fields.price,
          unit: record.fields.unit,
          storeAddress: `${record.fields.storeCity[0]} (${record.fields.storeZipCode[0]})`,
          storeName: record.fields.storeName[0],
          imgUrl: record.fields.images[0].url,
          subCategories: record.fields.subNames,
          quantity: record.fields.quantity || 1000
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
