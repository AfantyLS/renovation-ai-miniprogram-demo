function getBudgetLabel(budget) {
  const map = {
    "8-15万": "经济实用型",
    "15-25万": "品质舒适型",
    "25-40万": "品质升级型",
    "40万以上": "高配定制型"
  }

  return map[budget] || "灵活预算型"
}

function generateBudget(area, budget) {
  const numericArea = Number(area) || 100
  const baseMap = {
    "8-15万": 1200,
    "15-25万": 1900,
    "25-40万": 2800,
    "40万以上": 4200
  }
  const unitPrice = baseMap[budget] || 1800
  const total = Math.round(numericArea * unitPrice)

  return {
    total,
    items: [
      { name: "硬装施工", amount: Math.round(total * 0.38) },
      { name: "主材", amount: Math.round(total * 0.24) },
      { name: "家具软装", amount: Math.round(total * 0.22) },
      { name: "家电与智能设备", amount: Math.round(total * 0.1) },
      { name: "预留金", amount: Math.round(total * 0.06) }
    ]
  }
}

function buildReport(form) {
  const budget = generateBudget(form.area, form.budget)
  const budgetLabel = getBudgetLabel(form.budget)
  const style = form.style || "现代简约"
  const city = form.city || "未填写城市"

  return {
    id: Date.now().toString(),
    createdAt: new Date().toLocaleString(),
    project: {
      city,
      area: form.area || "未填写",
      layout: form.layout || "未填写",
      budget: form.budget || "未填写",
      style,
      family: form.family || "未填写"
    },
    summary: `本方案定位为${budgetLabel}，以${style}为主线，优先解决居住动线、收纳效率和日常清洁维护。结合${city}家庭居住习惯，建议先明确硬装边界，再通过软装和灯光塑造风格。`,
    highlights: [
      "公共区域保持开放通透，减少不必要隔断",
      "每个房间预留独立收纳系统，降低后期杂乱风险",
      "硬装控制在耐用、环保、易维护的范围内",
      "灯光采用基础照明、重点照明、氛围照明分层设计"
    ],
    rooms: [
      {
        name: "客厅",
        plan: "以舒适会客和家庭互动为核心，建议选择低饱和墙面、模块化沙发和隐藏式收纳电视柜。",
        materials: "地面建议使用耐磨木地板或柔光砖，墙面使用环保乳胶漆。"
      },
      {
        name: "主卧",
        plan: "主卧强调安静和睡眠质量，床头采用暖色局部照明，衣柜做到顶减少卫生死角。",
        materials: "墙面选择低 VOC 乳胶漆，窗帘建议遮光帘加纱帘组合。"
      },
      {
        name: "厨房",
        plan: "厨房重点优化洗切炒动线，台面预留小家电区，吊柜下方增加灯带。",
        materials: "台面建议石英石，墙面选择易清洁瓷砖。"
      },
      {
        name: "卫生间",
        plan: "优先做干湿分离，镜柜和壁龛提升收纳能力，地面注意防滑。",
        materials: "地砖选择防滑砖，五金选择耐腐蚀材质。"
      }
    ],
    materials: [
      { name: "环保乳胶漆", room: "全屋", note: "低 VOC，适合大面积使用" },
      { name: "柔光地砖 / 木地板", room: "客餐厅", note: "根据预算和清洁习惯二选一" },
      { name: "石英石台面", room: "厨房", note: "耐污耐磨，维护成本低" },
      { name: "防滑地砖", room: "卫生间", note: "优先考虑安全和排水" }
    ],
    furniture: [
      { name: "三人位沙发", room: "客厅", note: "选择可拆洗面料" },
      { name: "到顶衣柜", room: "卧室", note: "提升收纳容量" },
      { name: "餐边柜", room: "餐厅", note: "补充小家电和餐具收纳" },
      { name: "智能门锁", room: "入户", note: "提升便利性" }
    ],
    budget,
    nextSteps: [
      "补充准确户型尺寸和层高",
      "确认是否需要中央空调、新风、地暖",
      "选择 2 到 3 个偏好的参考图",
      "进入下一版后接入真实 AI 生成完整报告"
    ]
  }
}

module.exports = {
  buildReport
}

