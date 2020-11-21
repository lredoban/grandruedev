const qs = require('qs')

export default function ({ $http }, inject) {
  let $db
  if (process.client) {
    $db = $http.create({
      // See https://github.com/sindresorhus/ky#options
    })
    $db.setBaseURL('http://localhost:8888/.netlify/functions/')
    $db.fetch = (url, params) => $db.$get(url + '?' + qs.stringify(params))
  } else {
    $db = {
      fetch(ressource, params) {
        const data = require(`~/api/${ressource}`)
        return data[ressource](params)
      }
    }
  }

  // Inject to context as $db
  inject('db', $db)
}
