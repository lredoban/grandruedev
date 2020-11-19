export default function ({ $http }, inject) {
  let $db
  if (process.client) {
    $db = $http.create({
      // See https://github.com/sindresorhus/ky#options
    })
    $db.setBaseURL('http://localhost:8888/.netlify/functions/')
  } else {
    $db = {
      $get(ressource) {
        const data = require(`~/api/${ressource}`)
        return data[ressource]()
      }
    }
  }

  // Inject to context as $db
  inject('db', $db)
}
