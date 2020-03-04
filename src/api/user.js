import request from '@/utils/request'

export function login (data) {
  return request({
    baseURL: '/api',
    url: '/TokenAuth/Authenticate',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/Session/GetCurrentLoginInformations',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList (query) {
  return request({
    url: '/user/getall',
    method: 'get',
    params: query
  })
}
export function getUser (query) {
  return request({
    url: '/user/get',
    method: 'get',
    params: query
  })
}

export function getUsersByIds (ids) {
  return request({
    url: '/user/getUsers',
    method: 'get',
    params: { ids }
  })
}
// export function createUser(data) {
//   return request({
//     url: '/account/Register',
//     method: 'post',
//     data
//   })
// }
export function createUser (data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateUser (data) {
  return request({
    url: '/user/Update',
    method: 'put',
    data
  })
}

export function resetPassword (data) {
  return request({
    url: '/user/ResetPassword',
    method: 'post',
    data
  })
}
export function deleteUser (data) {
  return request({
    url: '/user/Delete',
    method: 'delete',
    params: data
  })
}
