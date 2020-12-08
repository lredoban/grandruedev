const logger = require('consola').withScope('api')
const base = require('./base')

exports.productsForCheckout = (ids) => {
  return base('Produits')
    .select({
      filterByFormula: `SEARCH(RECORD_ID(), "${ids.join(',')}") != ""`,
      fields: ['name', 'price', 'quantity', 'images']
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => {
        return {
          id: record.id,
          name: record.fields.name,
          price: record.fields.price,
          quantity: record.fields.quantity || 1000,
          imagesUrl: record.fields.images.map((img) => img.url)
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
