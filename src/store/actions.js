// localStorage操作
let localRead = (key) => {
  return window.localStorage.getItem(key)
}
let localWrite = (key, value) => {
  return window.localStorage.setItem(key, value)
}
let localRemove = (key) => {
  return window.localStorage.removeItem(key)
}
