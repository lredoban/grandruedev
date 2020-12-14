const logger = require('consola').withScope('api')
const base = require('./base')

exports.boutiques = (ids) => {
  return base('Boutiques')
    .select({
      filterByFormula: `SEARCH(RECORD_ID(), "${ids.join(',')}") != ""`,
      fields: [
        'name',
        'deliveryPrice',
        'deliveryThreshold',
        'clickNCollect',
        'homeDelivery'
      ]
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => {
        return {
          id: record.id,
          name: record.fields.name,
          deliveryPrice: record.fields.deliveryPrice,
          deliveryThreshold: record.fields.deliveryThreshold,
          clickNCollect: record.fields.clickNCollect,
          homeDelivery: record.fields.homeDelivery
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
