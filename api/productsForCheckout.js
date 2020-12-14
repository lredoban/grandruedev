const logger = require('consola').withScope('api')
const base = require('./base')

exports.productsForCheckout = (ids) => {
  return base('Produits')
    .select({
      filterByFormula: `SEARCH(RECORD_ID(), "${ids.join(',')}") != ""`,
      fields: ['name', 'price', 'quantity', 'images', 'store']
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => {
        return {
          id: record.id,
          name: record.fields.name,
          price: record.fields.price,
          storeId: record.fields.store[0],
          quantity:
            typeof record.fields.quantity === 'undefined'
              ? 1000
              : record.fields.quantity,
          imagesUrl: record.fields.images.map((img) => img.url)
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
