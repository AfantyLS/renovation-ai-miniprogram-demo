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

function inferStyle(prompt) {
  const styles = ["现代简约", "原木风", "奶油风", "中古风", "轻奢风", "侘寂风"]
  return styles.find((style) => prompt.indexOf(style) >= 0) || "现代简约"
}

function inferBudget(prompt) {
  if (/40万|四十万|高配|品质/.test(prompt)) return "40万以上"
  if (/25万|30万|三十万|40/.test(prompt)) return "25-40万"
  if (/8万|10万|十五万|省钱|出租/.test(prompt)) return "8-15万"
  return "15-25万"
}

function inferArea(prompt) {
  const matched = prompt.match(/(\d{2,3})\s*(㎡|平|平方)/)
  return matched ? matched[1] : "100"
}

function buildReport(form) {
  const prompt = form.prompt || form.needs || "希望整体温馨好打理，收纳充足。"
  const inferredBudget = form.budget || inferBudget(prompt)
  const inferredArea = form.area || inferArea(prompt)
  const budget = generateBudget(inferredArea, inferredBudget)
  const budgetLabel = getBudgetLabel(inferredBudget)
  const style = form.style || inferStyle(prompt)
  const city = form.city || "你的家"

  return {
    id: Date.now().toString(),
    createdAt: new Date().toLocaleString(),
    coverImage: "/assets/hero-renovation.png",
    floorPlanPath: form.floorPlanPath || "",
    prompt,
    project: {
      city,
      area: inferredArea,
      layout: form.layout || "智能规划",
      budget: inferredBudget,
      style,
      family: form.family || "未填写"
    },
    summary: `本方案定位为${budgetLabel}，以${style}为主线，优先解决居住动线、收纳效率和日常清洁维护。结合你的 Prompt，方案会把硬装预算控制在合理范围内，再通过软装、灯光和材质把空间氛围做出来。`,
    highlights: [
      "公共区域保持开放通透，减少不必要隔断",
      "每个房间预留独立收纳系统，降低后期杂乱风险",
      "硬装控制在耐用、环保、易维护的范围内",
      "灯光采用基础照明、重点照明、氛围照明分层设计"
    ],
    rooms: [
      {
        name: "客厅",
        tone: "living",
        renderTitle: "温润通透的会客核心",
        plan: "以舒适会客和家庭互动为核心，建议选择低饱和墙面、模块化沙发和隐藏式收纳电视柜。",
        materials: "地面建议使用耐磨木地板或柔光砖，墙面使用环保乳胶漆。"
      },
      {
        name: "主卧",
        tone: "bedroom",
        renderTitle: "安静放松的睡眠空间",
        plan: "主卧强调安静和睡眠质量，床头采用暖色局部照明，衣柜做到顶减少卫生死角。",
        materials: "墙面选择低 VOC 乳胶漆，窗帘建议遮光帘加纱帘组合。"
      },
      {
        name: "厨房",
        tone: "kitchen",
        renderTitle: "顺手好清洁的烹饪动线",
        plan: "厨房重点优化洗切炒动线，台面预留小家电区，吊柜下方增加灯带。",
        materials: "台面建议石英石，墙面选择易清洁瓷砖。"
      },
      {
        name: "卫生间",
        tone: "bath",
        renderTitle: "干湿分离与安全防滑",
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
      "接入真实 AI 后生成完整 HTML 报告和房间效果图"
    ]
  }
}

module.exports = {
  buildReport
}
