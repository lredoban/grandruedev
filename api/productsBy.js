const logger = require('consola').withScope('api')
const base = require('./base')

exports.productsBy = ({ key, param }) => {
  return base('Produits')
    .select({ filterByFormula: `${key}="${param}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => {
        return {
          slug: record.fields.ref.toLowerCase(),
          name: record.fields.name,
          price: record.fields.price,
          unit: record.fields.unit,
          storeAddress: `${record.fields.storeCity[0]} (${record.fields.storeZipCode[0]})`,
          storeName: record.fields.storeName[0],
          imgUrl: record.fields.images[0].url,
          subCategories: record.fields.subNames
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
