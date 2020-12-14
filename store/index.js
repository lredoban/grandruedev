export const state = () => ({
  displayCart: false
})

export const mutations = {
  setCartState(state, value) {
    state.displayCart = value
  }
}

export const actions = {
  openCart({ commit }) {
    commit('setCartState', true)
  },
  closeCart({ commit }) {
    commit('setCartState', false)
  }
}
