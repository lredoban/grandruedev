const { boutiques } = require('../api/boutiques')

const handler = async ({ queryStringParameters }) => {
  try {
    const data = await boutiques(Object.values(queryStringParameters))

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
