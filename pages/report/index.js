const app = getApp()

Page({
  data: {
    report: null
  },

  onLoad() {
    const report = app.globalData.currentReport || wx.getStorageSync("latestReport")
    if (report && !report.floorPlanAnalysis) {
      report.floorPlanAnalysis = [
        {
          title: "动线",
          content: "公共区域建议保持客餐厅连贯，减少不必要隔断，让入户、客厅、厨房之间更顺畅。"
        },
        {
          title: "采光",
          content: "优先保留窗边自然光面，墙面和柜体选择低饱和浅色系，提升空间明亮度。"
        },
        {
          title: "收纳",
          content: "玄关、客厅、卧室分别设置独立收纳点，降低后期杂物集中堆放的风险。"
        }
      ]
    }
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
