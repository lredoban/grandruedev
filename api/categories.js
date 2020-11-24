const logger = require('consola').withScope('api')
const base = require('./base')

exports.categories = () => {
  return base('Categories')
    .select({ view: 'Catégories Parentes' })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        slug: record.fields.slug,
        name: record.fields.name,
        imageThumbnail: record.fields.imageThumbnail[0].url
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
