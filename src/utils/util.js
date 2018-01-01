export function deepClone (obj) {
  let o
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null
    } else {
      if (obj instanceof Date) {
        o = obj
      } else if (obj instanceof Array) {
        o = []
        for (let i = 0, len = obj.length; i < len; i++) {
          o.push(deepClone(obj[i]))
        }
      } else {
        o = {}
        for (let j in obj) {
          o[j] = deepClone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}
