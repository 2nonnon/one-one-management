import { CreateGoodDto } from '../api/types/good.type'
import { defineStore } from 'pinia'
import { Names } from './store.namespace'

export const useStore = defineStore(Names.Store, {
  state: () => {
    return {
      isCollapse: false,
      account: '',
      accessToken: '',
      baseUrl: '',
      createGoodDto: {} as CreateGoodDto
    }
  },
  getters: {

  },
  actions: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    setAccount (account: string) {
      this.account = account
    },
    setAccessToken (accessToken: string) {
      this.accessToken = accessToken
    },
    resetCreateGoodDto () {
      this.createGoodDto = {} as CreateGoodDto
    }
  }
})
