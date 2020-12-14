const qs = require('qs')

export default function ({ $http, $config }, inject) {
  let $db
  if (process.client) {
    const baseUrl =
      $config.netlify && $config.netlifyContext !== 'production'
        ? `${$config.deployUrl}/.netlify/functions/`
        : $config.functionsBaseUrl

    $db = $http.create({
      // See https://github.com/sindresorhus/ky#options
    })
    $db.setBaseURL(baseUrl)
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
