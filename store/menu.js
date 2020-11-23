export const state = () => ({
  imageUrl: ''
})

export const mutations = {
  setImage(state, imageUrl) {
    state.imageUrl = imageUrl
  },
  clear(state) {
    state.imageUrl = ''
  }
}
