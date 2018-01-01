'use strict'

import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res,successMsg) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
  }
  if (res.data && (!res.data.success)) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
  }
  if (successMsg) {
    Message({
      message: successMsg,
      type: 'success',
      duration: 2 * 1000
    })
  }
  return res.data.data;
}

export default {
  post(url, data, successMsg) {
    return service({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res, successMsg)
      }
    )
  },
  get(url, params, successMsg) {
    return service({
      method: 'get',
      url,
      params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res, successMsg)
      }
    )
  }
}
