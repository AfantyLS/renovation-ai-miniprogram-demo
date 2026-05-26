const app = getApp()

const renderFallbacks = {
  "客厅": "/assets/render-living.jpg",
  "主卧": "/assets/render-bedroom.jpg",
  "卧室": "/assets/render-bedroom.jpg",
  "厨房": "/assets/render-kitchen.jpg",
  "卫生间": "/assets/render-bath.jpg"
}

function normalizeReport(report) {
  if (!report) return report

  if (!report.floorPlanAnalysis) {
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

  if (Array.isArray(report.rooms)) {
    report.rooms = report.rooms.map((room) => ({
      ...room,
      renderImage: room.renderImage || renderFallbacks[room.name] || "/assets/render-living.jpg",
      renderTitle: room.renderTitle || `${room.name}效果参考`
    }))
  }

  return report
}

Page({
  data: {
    report: null,
    previewVisible: false,
    previewIndex: 0,
    previewRoom: null
  },

  onLoad() {
    const report = normalizeReport(app.globalData.currentReport || wx.getStorageSync("latestReport"))
    this.setData({
      report
    })
  },

  previewRender(event) {
    const index = Number(event.currentTarget.dataset.index)
    const rooms = this.data.report.rooms || []
    const room = rooms[index]
    if (!room || !room.renderImage) return

    this.setData({
      previewVisible: true,
      previewIndex: index,
      previewRoom: room
    })
  },

  closePreview() {
    this.setData({
      previewVisible: false,
      previewRoom: null
    })
  },

  switchPreview(event) {
    const direction = event.currentTarget.dataset.direction
    const rooms = this.data.report.rooms || []
    if (!rooms.length) return

    const delta = direction === "next" ? 1 : -1
    const previewIndex = (this.data.previewIndex + delta + rooms.length) % rooms.length
    this.setData({
      previewIndex,
      previewRoom: rooms[previewIndex]
    })
  },

  noop() {},

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
