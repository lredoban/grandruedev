const logger = require('consola').withScope('api')
const base = require('./base')

exports.commande = ({ orderId }) => {
  return base('LineItems')
    .select({
      filterByFormula: `order="${orderId}"`,
      fields: [
        'name',
        'total',
        'quantity',
        'product',
        'storeName',
        'metadata',
        'total',
        'customerEmail'
      ]
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        ...record.fields,
        customerEmail: record.fields.customerEmail[0]
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
