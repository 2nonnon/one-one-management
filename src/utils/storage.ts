export const setStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key: string) => {
  return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
}
