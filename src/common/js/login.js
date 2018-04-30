import {GetStorageSync, SetStorageSync} from './StorageSync'

// 验证服务器URL
const HTTPS = 'https://www.acghobby.cn/index.php/Test/user'
// 请求方式
const METHOD = 'POST'
// 用户IDkey
const USERID = 'KXID'
// 用户名称key
const USERNAME = 'KXNAME'
// 用户头像key
const AVATARURL = 'KXAVATARURL'

// 自动登录逻辑
export function Login () {
  try {
    // 判断是否已经登录
    let val = GetStorageSync(USERID)
    // console.log(val)
    if (val) {
      // 如果登录 return
      console.log('login')
      return
    } else if (!val) {
      //  如果没登录
      wx.login({
        // 获取用户code
        success (res) {
          var code = res.code
          wx.getUserInfo({
            // 获取用户信息
            success (res) {
              // console.log(res)
              var userName = res.userInfo.nickName// 用户昵称
              var gender = res.userInfo.gender // 用户性别
              var avatarUrl = res.userInfo.avatarUrl
              console.log(res.userInfo)
              SetStorageSync(USERNAME, userName)
              SetStorageSync(AVATARURL, avatarUrl)
              if (code) {
                wx.request({
                  url: HTTPS,
                  method: METHOD,
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  data: {
                    code: code,
                    name: userName,
                    sex: gender
                  },
                  success (res) {
                    console.log(res)
                    if (res.data) {
                      try {
                        SetStorageSync('KXID', res.data.id)
                      } catch (e) {
                        console.log('储存失败')
                        console.log(e)
                      }
                    }
                  }
                })
              } else {
                console.log('登录失败')
              }
            }
          })
        },
        fail (error) {
          console.log('login failed ' + error)
        }
      })
    }
  } catch (e) {
    console.log(e)
    return
  }
}

// 返回用户头像 姓名
export function GetUserInfo () {
  let data = {
    name: GetStorageSync(USERNAME),
    image: GetStorageSync(AVATARURL)
  }
  return data
}
