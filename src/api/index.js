import http from '@/utils/http'
// 鉴权
export function authentic(params) {
  return http({
    url: '/ZHYD/loginto',
    method: 'get',
    params
  })
}

// 查询用户信息及留言信息
export function getUserInfo(params) {
  return http({
    url: '/ZHYD/msglist',
    method: 'get',
    params
  })
}

// 获取当前应答语
export function getCurYdyMusic(params) {
  return http({
    url: '/ZHYD/getvoxbase',
    method: 'get',
    params
  })
}

// 获取应答语列表
export function getYdyList(params) {
  return http({
    url: '/ZHYD/getvoxbase',
    method: 'get',
    params
  })
}

// 设置应答语
export function setYdy(params) {
  return http({
    url: '/ZHYD/setvoxbase',
    method: 'get',
    params
  })
}

// 恢复默认应答语
export function resetYdy(params) {
  return http({
    url: '/ZHYD/setclientvox',
    method: 'get',
    params
  })
}

// 获取温馨提示
export function getTipRichTxt(params) {
  return http({
    url: '/ZHYD/areaAd',
    method: 'get',
    params
  })
}

// 查询转呼状态
export function getCallForwardStatus(params) {
  return http({
    url: '/ZHYD/callinfo',
    method: 'get',
    params
  })
}

// 设置转呼状态
// cfType 呼转类型 无法接通（4不可及） 无人接听（5久叫不应） 占线（2免打扰）
// callState 设置呼转状态  0关闭，1开启	
export function setCallForwardStatus(params) {
  return http({
    url: '/ZHYD/callinfo',
    method: 'get',
    params
  })
}
