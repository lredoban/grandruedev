const logger = require('consola').withScope('api')
const md = require('markdown-it')({ breaks: true })
const base = require('./base')

const constructVariants = (variantString) => {
  try {
    const variants = JSON.parse(variantString)
    return Object.keys(variants)
      .slice(0, 2)
      .reduce((acc, key) => {
        acc[key] = variants[key]
        return acc
      }, {})
  } catch (e) {
    return {}
  }
}

exports.productBySlug = ({ slug }) => {
  return base('Produits')
    .select({ filterByFormula: `slug="${slug}"` })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        ...record.fields,
        id: record.id,
        store: record.fields.store[0],
        description: md.render(record.fields.description),
        storeLogo: record.fields.storeLogo[0].url,
        variants: constructVariants(record.fields.variants),
        quantity:
          typeof record.fields.quantity === 'undefined'
            ? 1000
            : record.fields.quantity,
        storeAddress: `${record.fields.storeCity[0]} (${record.fields.storeZipCode[0]})`
      }))[0]
    })
    .catch((err) => {
      logger.error(err)
    })
}
