const logger = require('consola').withScope('api')
const base = require('./base')

exports.categoryBySlug = ({ slug }) => {
  return base('Categories')
    .select({ filterByFormula: `slug="${slug}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        slug: record.fields.slug,
        name: record.fields.name,
        imageThumbnail: record.fields.imageThumbnail[0].url,
        products: record.fields.products
      }))[0]
    })
    .catch((err) => {
      logger.error(err)
    })
}
