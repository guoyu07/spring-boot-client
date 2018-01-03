var qs = require('qs')
var data = {
  username:'admin',
  password:'admin'
}
console.log(qs.stringify(data))
