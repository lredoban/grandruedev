const { productsBy } = require('../api/productsBy')

const handler = async ({ queryStringParameters }) => {
  try {
    const products = await productsBy(queryStringParameters)

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
