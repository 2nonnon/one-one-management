import { CreateGoodDto } from './../api/types/good'
import { defineStore } from 'pinia'
import { Names } from './store.namespace'

export const useStore = defineStore(Names.Store, {
  state: () => {
    return {
      isCollapse: false,
      username: '',
      accessToken: '',
      createGoodDto: {} as CreateGoodDto
    }
  },
  getters: {

  },
  actions: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    setUsername (username: string) {
      this.username = username
    },
    setAccessToken (accessToken: string) {
      this.accessToken = accessToken
    }
  }
})
