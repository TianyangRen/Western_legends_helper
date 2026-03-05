const DATA = {
  turn: [
    {
      section: "开始",
      title: "开始阶段结算",
      lines: [
        "移动火车到下一个检查点",
        "结算所有写明“回合开始”的能力与效果",
        "资源三选一：获 $20 / 抽2张牌 / 获 $10并抽1张牌",
        "声明并激活本回合使用的 1个坐骑 + 1个武器"
      ],
      tags: ["开始", "资源", "装备"]
    },
    {
      section: "行动",
      title: "行动阶段总则",
      lines: [
        "你有 3个行动点（AP），可自由分配",
        "也可执行不消耗AP的免费行动",
        "若有“移动前掷冒险骰”的需求，先结算骰子后再移动"
      ],
      tags: ["行动点", "免费行动", "冒险骰"]
    },
    {
      section: "结束",
      title: "结束阶段结算",
      lines: [
        "结算“回合结束”能力和效果",
        "结算满足条件的事件牌",
        "弃牌至手牌上限：基础5张，每受1伤上限-1",
        "通缉犯按当前通缉等级所在行获得 LP",
        "检查游戏结束条件，然后轮到左手玩家"
      ],
      tags: ["结束", "弃牌", "LP", "通缉"]
    }
  ],
  actions: [
    {
      section: "耗费1AP",
      title: "移动",
      lines: ["一次最多移动2格；坐骑可提升移动力"],
      tags: ["AP", "移动"]
    },
    {
      section: "耗费1AP",
      title: "地点行动 / 收购地契",
      lines: ["执行所在地行动，或按规则支付费用收购地契"],
      tags: ["AP", "地点", "地契"]
    },
    {
      section: "耗费1AP",
      title: "打工",
      lines: ["在任意“地点”可花1AP直接获 $10"],
      tags: ["AP", "打工", "金钱"]
    },
    {
      section: "耗费1AP",
      title: "卡牌行动",
      lines: ["执行手牌上的行动文字"],
      tags: ["AP", "卡牌"]
    },
    {
      section: "耗费1AP",
      title: "边境行动",
      lines: ["弃置总值 ≥ 边境数字的牌，获得奖励并移除标记"],
      tags: ["AP", "边境"]
    },
    {
      section: "耗费1AP",
      title: "修复",
      lines: ["移除所在地的1个废墟标记"],
      tags: ["AP", "修复"]
    },
    {
      section: "耗费1AP",
      title: "行商购买（区域行动）",
      lines: ["以 $40/件 买或升级传奇物品，买完后需移动行商"],
      tags: ["AP", "行商", "购买"]
    },
    {
      section: "耗费1AP",
      title: "玩家战斗",
      lines: ["可发起逮捕/决斗/抢劫；对同一人每回合限1次"],
      tags: ["AP", "战斗"]
    },
    {
      section: "免费行动",
      title: "反应牌",
      lines: ["满足条件时可随时打出反应牌，不消耗AP"],
      tags: ["免费", "反应牌"]
    },
    {
      section: "免费行动",
      title: "交牛 / 偷运",
      lines: ["到达对应牧场或火车站时自动触发相关结算"],
      tags: ["免费", "牛", "偷运"]
    },
    {
      section: "免费行动",
      title: "遭遇匪窝",
      lines: ["路过匪窝自动停止并触发战斗判定"],
      tags: ["免费", "匪窝", "战斗"]
    },
    {
      section: "免费行动",
      title: "途经特殊点",
      lines: ["火车站、匪窝、运牛目的地等按规则触发"],
      tags: ["免费", "触发"]
    },
    {
      section: "冒险骰",
      title: "移动前掷冒险骰",
      lines: [
        "先选奖励：抓1牌 / 获$10 / 移动1格（不算移动行动）",
        "再承受骰结果：[SP]=+1SP；[SP+1血滴]=+1SP并受1伤；[1血滴]=受1伤；[2血滴]=受2伤"
      ],
      tags: ["免费", "冒险骰", "SP", "受伤"]
    }
  ],
  combat: [
    {
      section: "核心提醒",
      title: "阵营变化提醒",
      lines: ["好人做坏事会立刻清零警官点，转为坏人/通缉犯"],
      tags: ["阵营", "警官点", "通缉"]
    },
    {
      section: "逮捕",
      title: "🛡️ 逮捕（好人抓坏人）",
      lines: [
        "发起者胜：好人得1警官点；被捕坏人受1伤、补1牌、没收牛+半金+半钱（向上取整）、清空通缉点并进警局",
        "发起者败（含平局/投降）：好人受1伤并补1牌"
      ],
      tags: ["逮捕", "好人", "坏人", "警局"]
    },
    {
      section: "决斗",
      title: "⚔️ 决斗",
      lines: [
        "发起者胜：获得2 LP，对方受伤摸牌",
        "发起者败（含平局/投降）：自己受伤摸牌"
      ],
      tags: ["决斗", "LP"]
    },
    {
      section: "抢劫",
      title: "💰 抢劫",
      lines: [
        "发起者胜：+1通缉点，并抢对方半钱或半金块（向上取整）",
        "发起者败（含平局/投降）：自己受伤摸牌"
      ],
      tags: ["抢劫", "通缉", "金钱"]
    },
    {
      section: "打匪徒",
      title: "🤠 打匪徒（被动触发）",
      lines: [
        "胜利：移除匪徒；非坏人得1 LP或1警官点，坏人得1 LP",
        "失败（平局算败）：受1伤+抽1牌，并移除匪徒"
      ],
      tags: ["匪徒", "被动", "LP", "警官点"]
    },
    {
      section: "警长抓人",
      title: "👮 警长抓人（被动触发）",
      lines: [
        "玩家胜：警长回警局，玩家无额外损失",
        "玩家败：受1伤+抽1牌，没收牛+半金+半钱，清空通缉点并进警局"
      ],
      tags: ["警长", "警局", "被动"]
    }
  ],
  locations: [
    {
      section: "通用",
      title: "📜 地点共通规则",
      lines: ["绝大多数地点都可执行“收购”行动，支付费用获取地契牌"],
      tags: ["地契", "收购", "通用"]
    },
    {
      section: "牧场",
      title: "📍 牧场",
      lines: [
        "套牛/长角牛（免费）：拿1牛标记，或弃长角牛获奖励",
        "偷运（免费）：弃另一颜色的牛，得1通缉点+标记奖励"
      ],
      tags: ["牧场", "牛", "偷运"]
    },
    {
      section: "火车站",
      title: "📍 火车站",
      lines: [
        "驱赶/长角牛（免费）：弃1牛得1警官点+标记奖励，或弃长角牛获奖励",
        "乘火车旅行：支付$10传送到另一火车站，再继续剩余移动力"
      ],
      tags: ["火车站", "牛", "警官点", "旅行"]
    },
    {
      section: "银行",
      title: "📍 银行",
      lines: [
        "兑现金块：每1金块= $20 + 1 LP",
        "抢劫银行（限1次）：赢则+3通缉点并拿$80；输则+1通缉点、受1伤、抽1牌"
      ],
      tags: ["银行", "金块", "LP", "通缉"]
    },
    {
      section: "金矿",
      title: "📍 金矿",
      lines: [
        "淘金（掷2骰）：",
        "金块图示=拿1金；$图示=拿$10；$带刷新=拿$10并重掷该骰（除沙砾外）；X=无事发生"
      ],
      tags: ["金矿", "淘金", "骰子"]
    },
    {
      section: "酒馆",
      title: "📍 酒馆",
      lines: [
        "挑战（扑克）：花$10底注，同城玩家可花$10加入",
        "赢/平：拿$50+所有底注，并得1 LP（或1通缉点），其余参与者抽1牌",
        "输：自己抽1牌"
      ],
      tags: ["酒馆", "扑克", "LP", "通缉"]
    },
    {
      section: "杂货店",
      title: "📍 杂货店",
      lines: ["可购买或升级任意数量物品，只要付得起钱"],
      tags: ["杂货店", "购买", "升级"]
    },
    {
      section: "诊所",
      title: "📍 诊所",
      lines: ["支付$10治愈全部伤害；每治愈1点伤害抽1张牌"],
      tags: ["诊所", "治疗", "抽牌"]
    },
    {
      section: "舞女酒吧",
      title: "📍 舞女酒吧",
      lines: ["每支付$30获得1 LP，可重复执行"],
      tags: ["舞女酒吧", "LP"]
    },
    {
      section: "火车",
      title: "📍 火车",
      lines: [
        "抢劫火车（限1次）：抽1张火车遭遇牌并与列车守卫战斗",
        "赢：获得卡牌指示奖励；输：承受失败惩罚并受1伤+抽1牌"
      ],
      tags: ["火车", "抢劫", "战斗"]
    },
    {
      section: "逃犯据点",
      title: "📍 逃犯据点",
      lines: ["偷运/长角牛规则与牧场、火车站同类结算"],
      tags: ["逃犯据点", "偷运", "牛"]
    },
    {
      section: "山洞隧道",
      title: "📍 山洞隧道",
      lines: ["通谷小径：消耗全部移动力，从一侧瞬移到另一侧，算1次移动行动"],
      tags: ["隧道", "移动"]
    }
  ]
};

const appState = {
  activeTab: "turn",
  activeSub: {
    turn: "全部",
    actions: "全部",
    combat: "全部",
    locations: "全部"
  },
  query: ""
};

const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));
const globalSearch = document.getElementById("globalSearch");
const searchHint = document.getElementById("searchHint");

function uniqSections(items) {
  return ["全部", ...new Set(items.map((item) => item.section))];
}

function cleanTitle(title) {
  return title.replace(/^[^\p{L}\p{N}]+/u, "").trim();
}

function getCardIcon(tab, item) {
  if (tab === "turn") {
    if (item.section === "开始") return "sunrise";
    if (item.section === "行动") return "play";
    if (item.section === "结束") return "moon";
    return "clock-3";
  }

  if (tab === "actions") {
    if (item.section === "耗费1AP") return "circle-dot";
    if (item.section === "免费行动") return "badge-check";
    if (item.section === "冒险骰") return "dice-3";
    return "zap";
  }

  if (tab === "combat") {
    if (item.section === "逮捕") return "shield";
    if (item.section === "决斗") return "swords";
    if (item.section === "抢劫") return "hand-coins";
    if (item.section === "打匪徒") return "hat-glasses";
    if (item.section === "警长抓人") return "shield-alert";
    return "alert-triangle";
  }

  if (tab === "locations") {
    if (item.section === "通用") return "scroll-text";
    return "map-pin";
  }

  return "book-open";
}

function refreshLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function createRuleCard(item, tab) {
  const card = document.createElement("article");
  card.className = "rule-card";

  const title = document.createElement("h3");
  title.className = "rule-title";

  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", getCardIcon(tab, item));

  const text = document.createElement("span");
  text.textContent = cleanTitle(item.title);

  title.appendChild(icon);
  title.appendChild(text);
  card.appendChild(title);

  item.lines.forEach((line, index) => {
    if (tab === "turn") {
      const lineRow = document.createElement("div");
      lineRow.className = "rule-line";

      const lineIcon = document.createElement("span");
      lineIcon.className = "line-index-icon";
      lineIcon.textContent = `${index + 1}`;

      const lineText = document.createElement("p");
      lineText.textContent = line;

      lineRow.appendChild(lineIcon);
      lineRow.appendChild(lineText);
      card.appendChild(lineRow);
      return;
    }

    const p = document.createElement("p");
    p.textContent = `• ${line}`;
    card.appendChild(p);
  });

  const tagRow = document.createElement("div");
  tagRow.className = "tag-row";
  item.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    tagRow.appendChild(span);
  });
  card.appendChild(tagRow);

  return card;
}

function textForSearch(item) {
  return [item.section, item.title, ...item.lines, ...item.tags].join(" ").toLowerCase();
}

function renderSubNav(tab) {
  const holder = document.querySelector(`[data-sub-nav="${tab}"]`);
  if (!holder) return;

  holder.innerHTML = "";
  const sections = uniqSections(DATA[tab]);

  sections.forEach((section) => {
    const chip = document.createElement("button");
    chip.className = `chip ${appState.activeSub[tab] === section ? "active" : ""}`;
    chip.textContent = section;
    chip.addEventListener("click", () => {
      appState.activeSub[tab] = appState.activeSub[tab] === section ? null : section;
      renderTabContent(tab);
      renderSubNav(tab);
    });
    holder.appendChild(chip);
  });
}

function renderTabContent(tab) {
  const holder = document.getElementById(`${tab}-content`);
  if (!holder) return;

  const sectionFilter = appState.activeSub[tab];
  const query = appState.query.trim().toLowerCase();

  let items = DATA[tab];
  if (sectionFilter && sectionFilter !== "全部") {
    items = items.filter((item) => item.section === sectionFilter);
  }
  if (query) {
    items = items.filter((item) => textForSearch(item).includes(query));
  }

  holder.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = "<p>没有匹配结果，试试更短关键词或切换子菜单</p>";
    holder.appendChild(empty);
    return;
  }

  items.forEach((item) => holder.appendChild(createRuleCard(item, tab)));
  refreshLucideIcons();
}

function setActiveTab(tab) {
  appState.activeTab = tab;
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tab}`);
  });

  if (DATA[tab]) {
    renderSubNav(tab);
    renderTabContent(tab);
  }
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

globalSearch.addEventListener("input", (event) => {
  appState.query = event.target.value;
  searchHint.textContent = appState.query
    ? `关键词：${appState.query}（仅筛选当前一级菜单）`
    : "默认显示当前菜单全部内容";

  if (DATA[appState.activeTab]) {
    renderTabContent(appState.activeTab);
  }
});

Object.keys(DATA).forEach((tab) => {
  renderSubNav(tab);
  renderTabContent(tab);
});
setActiveTab("turn");
refreshLucideIcons();