const md = require('markdown-it')({ breaks: true })

const productAttrFromRecord = (record) => ({
  description: md.render(record.fields.description),
  id: record.id,
  images: record.fields.images,
  imgUrl: record.fields.images[0].url,
  name: record.fields.name,
  price: record.fields.price,
  quantity:
    typeof record.fields.quantity === 'undefined'
      ? 1000
      : record.fields.quantity,
  preparation: record.fields.preparation,
  slug: record.fields.slug,
  store: record.fields.store[0],
  storeAddress: `${record.fields.storeCity[0]} (${record.fields.storeZipCode[0]})`,
  storeCitySlug: record.fields.storeCitySlug[0],
  storeLogo: record.fields.storeLogo[0].url,
  storeName: record.fields.storeName[0],
  storeSlug: record.fields.storeSlug[0],
  storeZipCode: record.fields.storeZipCode[0],
  subCategories: record.fields.subNames,
  subSlug: record.fields.subSlugs[0],
  unit: record.fields.unit,
  variants: constructVariants(record.fields.variants)
})

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

const getParams = ({ slug, storeCitySlug, storeSlug, subSlug }) => ({
  boutique: storeSlug,
  product: slug,
  subCategory: subSlug,
  ville: storeCitySlug
})

module.exports = { getParams, productAttrFromRecord }
