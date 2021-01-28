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

const createShippingLineItems = (
  lineItems,
  stores,
  selectedDate,
  selectedDelivery
) => {
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
    const name =
      selectedDelivery[id] === 'delivery'
        ? `Frais de port ${current.name}`
        : `Click & Collect ${current.name} le ${selectedDate[id]}`
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name,
          metadata: {
            storeId: id
          }
        },
        unit_amount: price
      },
      quantity: 1
    }
  })
  return allSippings
}

const handler = async ({ headers, queryStringParameters }) => {
  try {
    const baseUrl = headers.referer.split('//')[0] + '//' + headers.host
    const { items, selectedDate, selectedDelivery } = qs.parse(
      queryStringParameters
    )

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
      .filter((p) => p.quantity >= items[p.id].quantity)
      .map((p) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: p.name,
            images: p.imagesUrl,
            metadata: {
              id: p.id,
              storeId: p.storeId,
              infos: items[p.id].infos
            }
          },
          unit_amount: p.price
        },
        description: items[p.id].infos || p.name,
        quantity: items[p.id].quantity
      }))
    line_items.push(
      ...createShippingLineItems(
        line_items,
        boutiques,
        selectedDate,
        selectedDelivery
      )
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
