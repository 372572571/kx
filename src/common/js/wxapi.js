import {regExpPhone} from './regexp.js'

export function phoneCode (usrPhone, usrToken = '') {
  if (!regExpPhone(usrPhone)) {
    return null
  }
  wx.request({
    url: 'https://www.acghobby.cn/index.php/Test/pushCode',
    method: 'POST',
    data: {
      usrToken: usrToken,
      usrPhone: usrPhone
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' // 默认值
    },
    success (res) {
      // console.log(res.data)
    }
  })
}

export function GetOrders (Token, type, Num, page) {
  let newPromise = new Promise((resolve, reject) => {
    wx.request({
      url: 'https://www.acghobby.cn/index.php/Orders/get',
      method: 'POST',
      data: {
        usrToken: Token,  // 用户token
        type: type, // 查询条件
        showNum: Num, // 一页显示多少
        page: page // 当前第几页
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        resolve(res)
      },
      fail (res) {
        reject(res)
      }
    })
  })
  return newPromise
}

