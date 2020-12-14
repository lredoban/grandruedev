const { categoryBySlug } = require('../api/categoryBySlug')

const handler = async ({ queryStringParameters }) => {
  try {
    const products = await categoryBySlug(queryStringParameters)

    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
