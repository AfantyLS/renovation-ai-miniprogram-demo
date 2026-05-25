const app = getApp()

Page({
  data: {
    report: null
  },

  onLoad() {
    const report = app.globalData.currentReport || wx.getStorageSync("latestReport")
    this.setData({
      report
    })
  },

  goCreate() {
    wx.navigateTo({
      url: "/pages/create/index"
    })
  },

  goHistory() {
    wx.navigateTo({
      url: "/pages/history/index"
    })
  }
})
