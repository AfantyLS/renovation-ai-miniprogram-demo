const { buildReport } = require("../../utils/mockReport")

const app = getApp()

Page({
  data: {
    floorPlanPath: "",
    promptValue: "",
    promptTemplates: [
      "90平三室两厅，原木风，预算20万，想要多收纳、好打理、适合三口之家。",
      "小户型，现代简约，希望显大，客厅要有办公区，预算尽量控制。",
      "奶油风，想要温馨柔和的家，主卧舒适，厨房和卫生间要好清洁。",
      "中古风，喜欢有质感的木色和复古灯具，需要完整材料清单和预算建议。"
    ]
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

  onPromptInput(event) {
    this.setData({
      promptValue: event.detail.value
    })
  },

  useTemplate(event) {
    const index = Number(event.currentTarget.dataset.index)
    this.setData({
      promptValue: this.data.promptTemplates[index] || ""
    })
  },

  generateReport() {
    const prompt = this.data.promptValue.trim()
    if (!prompt) {
      wx.showToast({
        title: "先写下你的装修想法",
        icon: "none"
      })
      return
    }

    const form = {
      prompt,
      city: "你的家",
      layout: "智能规划",
      family: "居住需求待补充",
      floorPlanPath: this.data.floorPlanPath
    }

    wx.showLoading({
      title: "生成方案中"
    })
    const report = buildReport(form)
    app.globalData.currentReport = report
    wx.setStorageSync("latestReport", report)

    const reports = wx.getStorageSync("reports") || []
    wx.setStorageSync("reports", [report, ...reports].slice(0, 20))

    setTimeout(() => {
      wx.hideLoading()
      wx.navigateTo({
        url: "/pages/report/index"
      })
    }, 600)
  }
})
