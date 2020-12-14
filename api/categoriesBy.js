const logger = require('consola').withScope('api')
const base = require('./base')

exports.categoriesBy = ({ key, param }) => {
  return base('Categories')
    .select({ filterByFormula: `${key}="${param}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        slug: record.fields.slug,
        name: record.fields.name
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
