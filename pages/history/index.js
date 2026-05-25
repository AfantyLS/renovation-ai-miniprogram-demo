const app = getApp()

Page({
  data: {
    reports: []
  },

  onShow() {
    this.setData({
      reports: wx.getStorageSync("reports") || []
    })
  },

  openReport(event) {
    const index = Number(event.currentTarget.dataset.index)
    const report = this.data.reports[index]
    if (!report) return

    app.globalData.currentReport = report
    wx.navigateTo({
      url: "/pages/report/index"
    })
  },

  goCreate() {
    wx.navigateTo({
      url: "/pages/create/index"
    })
  }
})

