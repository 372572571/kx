const ADDRESS_NUMBER = 5
const ADDRESS_NAME = 'KX-ADDRESS-'

export function AddressEdit (id, value) {
  if (parseInt(id) < ADDRESS_NUMBER) {
    try {
      wx.setStorageSync(ADDRESS_NAME + id, value)
      return true
    } catch (e) {
      console.log(e)
    }
  }
}

// 根据名称取出相应的地址
export function GetAddress (name) {
  try {
    return GetStorageSync(name)
  } catch (e) {
    console.log(e)
    return ''
  }
}

// 取出所有地址
export function GetAddressS () {
  let arr = []
  for (let i = 0; i < ADDRESS_NUMBER; i++) {
    try {
      arr.push(GetAddress(ADDRESS_NAME + i))
    } catch (e) {
      arr.push('')
    }
  }
  return arr
}

// 根据Key查找缓存
export function GetStorageSync (name) {
  try {
    return wx.getStorageSync(name)
  } catch (e) {
    console.log(e)
    return ''
  }
}

// 根据key 存储数据val
export function SetStorageSync (key, val) {
  try {
    wx.setStorageSync(key, val)
  } catch (e) {
    console.log(e)
  }
}

