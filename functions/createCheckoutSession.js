require('dotenv').config()

const qs = require('qs')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { productsForCheckout } = require('../api/productsForCheckout')
const { boutiques: getBoutiques } = require('../api/boutiques')

const storeSubTotals = (lineItems) => {
  return lineItems.reduce((totalMap, item) => {
    const { storeId } = item.price_data.product_data.metadata
    if (typeof totalMap[storeId] === 'undefined') totalMap[storeId] = 0
    totalMap[storeId] += item.price_data.unit_amount * item.quantity
    return totalMap
  }, {})
}

const createShippingLineItems = (lineItems, stores, selectedDelivery) => {
  const storeSub = storeSubTotals(lineItems)
  const allSippings = Object.keys(storeSub).map((id) => {
    const total = storeSub[id]
    let price = 0
    const current = stores.find((s) => s.id === id)
    if (selectedDelivery[id] === 'delivery') {
      const threshold = current.deliveryThreshold
      if (typeof threshold === 'undefined' || threshold > total)
        price += current.deliveryPrice
    }
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Frais de port ${current.name}`,
          metadata: {
            storeId: id
          }
        },
        unit_amount: price
      },
      quantity: 1
    }
  })
  return allSippings.filter((s) => s.price_data.unit_amount > 0)
}

const handler = async ({ headers, queryStringParameters }) => {
  try {
    const lang = headers.referer.includes('/fr/') ? 'fr' : 'en'
    const baseUrl = headers.referer.split(lang)[0] + lang
    const { items, selectedDelivery } = qs.parse(queryStringParameters)

    const products = await productsForCheckout(Object.keys(items))
    const boutiques = await getBoutiques(
      products.reduce((acc, product) => {
        if (!acc[product.storeId]) acc.push(product.storeId)
        return acc
      }, [])
    )
    // TODO add line-items for shippings with metadata for requested delivery date
    // TODO add product metadata for pickup/delivery date

    // eslint-disable-next-line camelcase
    const line_items = products
      // removing out of stock
      .filter((p) => p.quantity >= items[p.id])
      .map((p) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: p.name,
            images: p.imagesUrl,
            metadata: {
              id: p.id,
              storeId: p.storeId
            }
          },
          unit_amount: p.price
        },
        quantity: items[p.id]
      }))
    line_items.push(
      ...createShippingLineItems(line_items, boutiques, selectedDelivery)
    )
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['FR']
      },
      line_items,
      mode: 'payment',
      success_url: baseUrl + '/success',
      cancel_url: baseUrl + '/cart' // query for flash messages
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
