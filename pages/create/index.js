const { buildReport } = require("../../utils/mockReport")

const app = getApp()

Page({
  data: {
    floorPlanPath: "",
    budgetOptions: ["8-15万", "15-25万", "25-40万", "40万以上"],
    styleOptions: ["现代简约", "原木风", "奶油风", "中古风", "轻奢风"],
    budgetIndex: 1,
    styleIndex: 0,
    form: {}
  },

  chooseFloorPlan() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      success: (res) => {
        const file = res.tempFiles && res.tempFiles[0]
        this.setData({
          floorPlanPath: file ? file.tempFilePath : ""
        })
      }
    })
  },

  onBudgetChange(event) {
    this.setData({
      budgetIndex: Number(event.detail.value)
    })
  },

  onStyleChange(event) {
    this.setData({
      styleIndex: Number(event.detail.value)
    })
  },

  submitForm(event) {
    const values = event.detail.value
    const form = {
      ...values,
      budget: this.data.budgetOptions[this.data.budgetIndex],
      style: this.data.styleOptions[this.data.styleIndex],
      floorPlanPath: this.data.floorPlanPath
    }

    if (!form.city || !form.area || !form.layout) {
      wx.showToast({
        title: "请填写城市、面积和户型",
        icon: "none"
      })
      return
    }

    const report = buildReport(form)
    app.globalData.currentReport = report
    wx.setStorageSync("latestReport", report)

    wx.navigateTo({
      url: "/pages/report/index"
    })
  }
})

