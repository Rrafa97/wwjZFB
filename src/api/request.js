import instance from './requestConfig'
import {getCookie} from "../util/util";


export function getCoin(code) {
  return instance({
    method: 'post',
    url: '/wwj.json',
    params: {
      cmd: 'GETCOIN',
      code: code,
    }
  })
}

/**
 * user 页面部分
 * @param devId
 */

export function ADVERTIN(devId) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'ADVERTIN',
    }
  })
}

export function ADVERTEX() {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'ADVERTEX',
    }
  })
}

export function START(count, devId) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'START',
      uid: getCookie('mapptUser'),
      costCurrency: count,
      machineId: devId,
      machineLatitude: getCookie('nowLatitude') === false ? 0 : getCookie('nowLatitude') === undefined ? 0 : getCookie('nowLatitude'),
      machineLongitude: getCookie('nowLongitude') === false ? 0 : getCookie('nowLongitude') === undefined ? 0 : getCookie('nowLongitude')
    }
  })
}

export function getDevState(devId) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'DEVINFO',
      devId: devId
    }
  })
}
//获取个人信息
export function personInfo(uid) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'PERINFO',
      uId: uid
    }
  })
}

export function RECCOIN(devId) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'RECCOIN',
      devId: devId
    }
  })
}


export function PACKET(devId) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'PACKET',
    }
  })
}

export function PAY(packageId, uid) {
  return instance({
    method: 'post',
    url: '/PAY',
    params: {
      uid: uid,
      packageId: packageId,
      vid: getCookie('machineId')
    }
  })
}

export function WXPAY(devId, payMent, total) {
  return instance({
    method: 'post',
    url: '/pay/WXPAY',
    params: {
      devId: devId,
      uid: getCookie('mapptUser'),
      payMent: payMent,
      total: total
    }
  })
}

export function ALIPAY(devId, payMent, total) {
  return instance({
    method: 'post',
    url: '/pay/ALIPAY',
    dataType: 'json',
    params: {
      devId: devId,
      uid: getCookie('mapptUser'),
      payMent: payMent,
      total: total
    }
  })
}


export function DEVSTAR(uid, devid) {
  return instance({
    method: 'post',
    url: '/DEVSTAR',
    params: {
      uid: uid,
      devId: devid
    }
  })
}

export function WXCONFIG() {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'WXCONFIG',
      payUrl: location.href.split('#')[0]
    }
  })
}


/**
 * QUESINFO 常见问题
 * @param devId
 * @constructor
 */

export function QUESINFO() {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'QUESINFO',
    }
  })
}

/**
 * user personCenter部分
 * @param devId
 */

export function USERINFO(uid) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'USERINFO',
      uid: uid
    }
  })
}

export function PAYINFO(uid, begin, size) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'PAYINFO',
      uid: uid,
      begin: begin,
      size: size
    }
  })
}

export function PUSHINFO(uid, begin, size) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'PUSHINFO',
      uid: uid,
      begin: begin,
      size: size
    }
  })
}


/**
 *member 页面部分
 */


export function ADVERTACT() {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'ADVERTACT',
    }
  })
}

export function ACTIVITY() {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'ACTIVITY',
    }
  })
}

export function DEPOSITPAY(uid) {
  return instance({
    method: 'get',
    url: '/DEPOSITPAY',
    params: {
      uid: uid
    }
  })
}

export function DEVSITBACK(uid) {
  return instance({
    method: 'get',
    url: '/DEVSITBACK',
    params: {
      uid: uid
    }
  })
}

export function DEVONLINE(devId) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'DEVONLINE',
      devId: devId
    }
  })
}


export function SHOWPACKET(devId, coin) {

  return instance({

    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'SHOWPACKET',
      ukMachineId: devId,
      packageId: coin,
      agentId:"DEV"
    }
  })


}

export function SHOWMONPACKET(devId,type) {
  return instance({
    method: 'get',
    url: '/wwj.json',
    params: {
      cmd: 'SHOWPACKET',
      ukMachineId: devId,
      agentId: type
    }
  })
}


export function ALIPAYMON(packageId, uid) {
  return instance({
    method: 'post',
    url: '/alipay/aliPayBuyMon',
    dataType: 'json',
    params: {
      vid: getCookie('machineId'),
      userId: uid,
      packageId: packageId
    }
  })
}


export function PAYMON(packageId, uid) {
  return instance({
    method: 'post',
    url: '/PAYMON',
    params: {
      uid: uid,
      packageId: packageId,
      vid: getCookie('machineId')
    }
  })
}

/**1.微信租赁接口
 rent/wxRent
 入参: uid 用户编号 vid 设备编号
 返回：微信支付的参数
 支付成功返回和原先接口一样 */
export function wxRent(uid,vid) {
  return instance({
    method: 'post',
    url: '/rent/wxRent',
    params: {
      uid: uid,
      vid: vid
    }
  })
}
/**
 * 2. 支付宝租赁
 rent/aliRent
 入参: uid 用户编号 vid 设备编号
 返回：支付宝支付的参数
 支付成功返回和原先接口一样*/
export function aliRent(uid,vid) {
  return instance({
    method: 'post',
    url: '/rent/aliRent',
    params: {
      uid: uid,
      vid: vid
    }
  })
}
/**3. 查询设备是否可以租赁
 rent/checkDev
 入参： vid 设备编号
 返回： 438-设备编号不能为空	 200-可以租赁 201-已租赁 500-出现异常 */
export function checkDev(vid) {
  return instance({
    method: 'get',
    url: '/rent/checkDev',
    params: {
      vid: vid
    }
  })
}
/**4. 检查用户是否租赁
 rent/checkUser
 入参：uid 用户编号
 返回：438-用户编号不能为空  200-设备编号（已租赁） 201-已到期/未租赁  */
export function checkUser(uid) {
  return instance({
    method: 'get',
    url: '/rent/checkUser',
    params: {
      uid: uid
    }
  })
}
export function rentStart(uid,coin,machineId) {
  return instance({
    method: 'post',
    url: '/rent/rentStart',
    params: {
      uid: uid,
      coin: coin,
      machineId: machineId
    }
  })
}
export function getCoinByCoupon(userId,couponCode) {
  return instance({
    method: 'get',
    url: 'http://112.15.38.214:9080/user/getCoinByCoupon',
    params: {
      userId: userId,
      couponCode:couponCode
    }
  });
}
