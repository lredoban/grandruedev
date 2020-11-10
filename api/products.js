require('dotenv').config()
const logger = require('consola').withScope('api')

const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  'appRq445lj2z1F2Zw'
)

exports.getRecentProducts = () => {
  return base('Produits')
    .select({
      maxRecords: 5,
      view: 'Tous les produits'
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        id: record.fields.id,
        slug: record.fields['Référence'].toLowerCase(),
        name: record.fields.Nom,
        price: record.fields["Prix à l'unité"],
        unit: record.fields['Unité de vente'],
        vendorAddress: record.fields['Adresse de la Boutique'][0],
        vendorName: record.fields['Nom de la boutique'][0],
        imgUrl: record.fields['Photos du produit'][0].url
      }))
    })
    .catch((err) => {
      logger.error(err)
    })
}
