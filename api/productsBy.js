const logger = require('consola').withScope('api')
const base = require('./base')

exports.productsBy = ({ key, limit = 100, param }) => {
  return base('Produits')
    .select({
      filterByFormula: `${key}="${param}"`,
      pageSize: parseInt(limit)
    })
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
          quantity:
            typeof record.fields.quantity === 'undefined'
              ? 1000
              : record.fields.quantity
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
