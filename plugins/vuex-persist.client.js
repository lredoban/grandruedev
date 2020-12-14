// https://github.com/championswimmer/vuex-persist
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'grand-rue',
    modules: ['cart']
  }).plugin(store)
}
