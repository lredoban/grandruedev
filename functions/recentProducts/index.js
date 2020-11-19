const { recentProducts } = require('../../api/recentProducts')

const handler = async (event) => {
  try {
    const products = await recentProducts()

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
