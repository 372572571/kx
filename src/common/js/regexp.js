// 手机正则
export function regExpPhone (num) {
  let reg = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/
  return reg.test(num)
}

export function regExpHtml (str) {
  return escape(str)
}

function escape (html) {
  html = utf16ToEntities(html)
  html = html.replace(/<\/?[^>]*>/g, '')    // HTML标记
  html = html.replace(/([\r\n])[\s]+/g, '')    // 换行/空格
  html = html.replace(/<!--.*-->/g, '')   // HTML注释
  html = html.replace(/['"‘’“”!@#$%^&*！￥×+=]/g, '') // 非法字符
  return html
}

function utf16ToEntities (str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(patt, (char) => {
    var H, L, code
    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
      return '&#' + code + ';'
    } else {
      return char
    }
  })
  return str
}
