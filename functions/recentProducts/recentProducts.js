// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const { getRecentProducts } = require('../../api/products')

const handler = async (event) => {
  try {
    const recentProducts = await getRecentProducts()

    return {
      statusCode: 200,
      body: JSON.stringify(recentProducts)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
