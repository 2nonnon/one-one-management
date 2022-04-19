import { defineStore } from 'pinia'
import { Names } from './store.namespace'

export const useStore = defineStore(Names.Store, {
  state: () => {
    return {
      isCollapse: false
    }
  },
  getters: {

  },
  actions: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
})
