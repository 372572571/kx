export {go}

const GO = [
  '/pages/forms/main'
]

function goto (strurl) {
  wx.navigateTo({
    url: strurl
  })
}

function go (id) {
  try {
    goto(GO[id])
  } catch (e) {
    console.log(e)
  }
}

