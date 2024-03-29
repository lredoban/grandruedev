import Vue from 'vue'

export const state = () => ({
  items: [],
  storeInfos: {}
})

export const mutations = {
  setStoreInfos(state, payload) {
    state.storeInfos = payload
  },
  setItemQuantity(state, { itemId, cartQuantity }) {
    const index = state.items.findIndex((item) => item.id === itemId)
    if (index > -1 && cartQuantity <= state.items[index].quantity)
      Vue.set(state.items, index, { ...state.items[index], cartQuantity })
  },
  addItem(state, product) {
    if (product.quantity === 0) return
    const currentItem = state.items.find((item) => item.id === product.id)
    if (!currentItem) state.items.push({ ...product, cartQuantity: 1 })
    else if (currentItem.cartQuantity < product.quantity)
      currentItem.cartQuantity += 1
  },
  removeItem(state, product) {
    const index = state.items.findIndex((item) => item.id === product.id)
    if (index !== -1) {
      state.items[index].cartQuantity -= 1
      if (state.items[index].cartQuantity === 0) state.items.splice(index, 1)
    }
  },
  deleteItem(state, id) {
    const index = state.items.findIndex((item) => item.id === id)
    if (index > -1) state.items.splice(index, 1)
  },
  emptyCart(state) {
    state.items = []
  }
}

export const actions = {
  addToCart({ commit }, payload) {
    commit('addItem', payload)
  },
  removeFromCart({ commit }, payload) {
    commit('removeItem', payload)
  }
}

export const getters = {
  itemsCount(state) {
    return state.items.reduce((count, item) => count + item.cartQuantity, 0)
  },
  itemCount: (state) => (id) => {
    const item = state.items.find((item) => item.id === id)
    if (item) return item.cartQuantity
    return 0
  },
  storeSubtotalPrice: (_, getters) => (id) => {
    return getters.itemsByStore[id].items.reduce(
      (price, item) => price + item.cartQuantity * item.price,
      0
    )
  },
  itemsSubtotalPrice(state) {
    return state.items.reduce(
      (price, item) => price + item.cartQuantity * item.price,
      0
    )
  },
  itemsByStore(state) {
    const itemsByStore = {}
    state.items.forEach((item) => {
      const storeId = item.store
      if (!itemsByStore[storeId]) {
        itemsByStore[storeId] = {
          name: item.storeName,
          zip: item.storeZipCode,
          items: []
        }
      }
      itemsByStore[storeId].items.push(item)
    })
    return itemsByStore
  }
}
