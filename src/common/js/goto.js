export {gotoforms}

function goto (strurl) {
  wx.navigateTo({
    url: strurl
  })
}

function gotoforms () {
  goto('/pages/forms/main')
}

