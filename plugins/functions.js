export default function ({ $http, env }, inject) {
  const $functions = $http.create({
    // See https://github.com/sindresorhus/ky#options
  })
  $functions.setBaseURL('http://localhost:8888/.netlify/functions/')

  // Inject to context as $functions
  inject('functions', $functions)
}