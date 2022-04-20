import { PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'
import { getStorage, setStorage } from '../utils/storage'

const piniaKey = 'PINIAKEY'

type PiniaOption = {
    key: string
}

export const piniaPlugin = (options: PiniaOption) => {
  return (context: PiniaPluginContext) => {
    const { store } = context

    const data = getStorage(`${options?.key ?? piniaKey}-${store.$id}`)

    store.$subscribe(() => {
      setStorage(`${options?.key ?? piniaKey}-${store.$id}`, toRaw(store.$state))
    })

    return {
      ...data
    }
  }
}
