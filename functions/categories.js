const { categories } = require('../api/categories')

const handler = async (event) => {
  try {
    const products = await categories()

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
