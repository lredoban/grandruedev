const qs = require('qs')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const { productsForCheckout } = require('../api/productsForCheckout')

const handler = async ({ headers, queryStringParameters }) => {
  const lang = headers.referer.includes('/fr/') ? 'fr' : 'en'
  const baseUrl = headers.referer.split(lang)[0] + lang
  const query = qs.parse(queryStringParameters)
  const items = query.items
  console.warn('query ->', query, Object.keys(items))
  const products = await productsForCheckout(Object.keys(items))
  console.warn('products ->', products)

  // TODO add line-items for shippings with metadata for requested delivery date

  // eslint-disable-next-line camelcase
  const line_items = products
    // remove out of stock
    .filter((p) => p.quantity >= items[p.id])
    .map((p) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: p.name,
          images: p.imagesUrl
        },
        unit_amount: p.price
      },
      quantity: items[p.id]
    }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: baseUrl + '/success',
    cancel_url: baseUrl + '/cancel' // TODO headers.referer + query for flash messages
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id })
  }
}

module.exports = { handler }
