import http from '@/utils/http'
// 鉴权
export function init(params) {
  return http({
    url: '/ZHYD/loginto',
    method: 'get',
    params
  })
}

// 查询用户信息
export function getUserInfo(params) {
  return http({
    url: '/ZHYD/msglist',
    method: 'get',
    params
  })
}

// export function payAction(data) {
//   return http({
//     url: '/api/wxPay/payAction',
//     method: 'post',
//     data: data
//   })
// }