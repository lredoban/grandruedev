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
          citySlug: record.fields.citySlug,
          clickNCollect: record.fields.clickNCollect,
          deliveryPrice: record.fields.deliveryPrice,
          deliveryThreshold: record.fields.deliveryThreshold,
          homeDelivery: record.fields.homeDelivery,
          id: record.id,
          name: record.fields.name
        }
      })
    })
    .catch((err) => {
      logger.error(err)
    })
}
