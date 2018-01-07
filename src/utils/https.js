import qs from 'qs'

export default {
  post(url, data) {
    let sessionId = window.sessionStorage.getItem('sessionId')
    if (sessionId) {
      data.sessionId = sessionId
    }
    return window.fetch(process.env.BASE_API + url, {
      method: 'post',
      body: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      return commonThen(res)
    }).catch((res) => {
      return commonCatch(res)
    })
  },
  get(url, data) {
    let sessionId = window.sessionStorage.getItem('sessionId')
    if (sessionId) {
      data.sessionId = sessionId
    }
    return window.fetch(process.env.BASE_API + url + "?" + qs.stringify(data), {
      method: 'get',
      'X-Requested-With': 'XMLHttpRequest'
    }).then((res) => {
      return commonThen(res)
    }).catch((res) => {
      return commonCatch(res)
    })
  }
}

function commonThen(res) {
  let response = res.json();
  response.then(function (data) {
    if (data.result === 403 && !window.sessionStorage.sessionId) {
      window.location.reload()
    }
  })
  console.log("commonThen=>", response);
  if (res.status.toString()[0] === '2') {
    return response
  } else {
    return Promise.reject(res)
  }
}

function commonCatch(res) {
  // status code 3xx不报错
  if (res.status && res.status.toString()[0] === '3') {
  } else {

  }
  console.log("commonCatch=>", res);
  return Promise.reject(res)
}
