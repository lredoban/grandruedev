export default function ({ $http, env }, inject) {
  // Create a custom HTTP instance
  const $functions = $http.create({
    // See https://github.com/sindresorhus/ky#options
  })
  // Set baseURL to something different
  $functions.setBaseURL('http://localhost:8888/.netlify/functions/')

  // Inject to context as $functions
  inject('functions', $functions)
}
