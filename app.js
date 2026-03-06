const DATA = {
  turn: [
    {
      section: "开始",
      title: "开始阶段结算",
      lines: [
        "移动火车到下一个检查点",
        "翻卡移动旅行商人到下一个检查点",
        "结算所有写明“回合开始”的能力与效果",
        "三选一：$20 / 抽2张牌 / $10 + 抽1张牌",
        "声明本回合使用的 1个坐骑 + 1个武器"
      ],
      tags: ["开始", "资源", "装备"]
    },
    {
      section: "行动",
      title: "行动阶段总则",
      lines: [
        "你有 3个行动点 (AP)，可自由分配",
        "也可执行不消耗AP的免费行动",
        "若有“移动前掷冒险骰”的需求，先结算骰子后再移动"
      ],
      tags: ["AP", "免费行动", "冒险骰"]
    },
    {
      section: "结束",
      title: "结束阶段结算",
      lines: [
        "结算“回合结束”能力和效果",
        "结算满足条件的事件牌",
        "弃牌至手牌上限：基础5张，每受1伤上限-1",
        "通缉玩家按当前通缉等级所在行获得 LP",
        "检查游戏结束条件，然后轮到左手玩家"
      ],
      tags: ["结束", "弃牌", "LP", "通缉"]
    }
  ],
  actions: [
    {
      section: "耗费1AP",
      title: "移动",
      lines: ["使用 1AP，一次最多移动2格；坐骑可提升移动力"],
      tags: ["AP", "移动"]
    },
    {
      section: "耗费1AP",
      title: "地点行动 / 收购地契",
      lines: ["使用 1AP，执行所在地行动，或支付费用购买地契"],
      tags: ["AP", "地点", "地契"]
    },
    {
      section: "耗费1AP",
      title: "打工",
      lines: ["使用 1AP，在任意地点直接获 $10","(有人打工时拥有地契者还可获 $10)"],
      tags: ["AP", "打工", "金钱"]
    },
    {
      section: "耗费1AP",
      title: "卡牌行动",
      lines: ["使用 1AP，执行手牌上的行动文字（Action）"],
      tags: ["AP", "卡牌"]
    },
    {
      section: "耗费1AP",
      title: "开拓边境",
      lines: ["使用 1AP，弃置总值 ≥ 边境数字的牌，获得奖励并移除标记"],
      tags: ["AP", "边境"]
    },
    {
      section: "耗费1AP",
      title: "修复",
      lines: ["使用 1AP，移除所在地的1个废墟标记"],
      tags: ["AP", "修复"]
    },
    {
      section: "耗费1AP",
      title: "玩家战斗",
      lines: ["使用 1AP，可发起逮捕/决斗/抢劫；对同一人每回合限1次"],
      tags: ["AP", "战斗"]
    },
    {
      section: "耗费0AP",
      title: "反应牌",
      lines: ["满足条件时可随时打出反应牌，不消耗AP"],
      tags: ["免费", "反应牌"]
    },
    {
      section: "耗费0AP",
      title: "交牛 / 偷运",
      lines: ["到达对应牧场或火车站时自动触发相关结算"],
      tags: ["免费", "牛", "偷运"]
    },
    {
      section: "耗费0AP",
      title: "遭遇匪窝",
      lines: ["路过匪窝自动停止并触发战斗判定"],
      tags: ["免费", "匪窝", "战斗"]
    },
    {
      section: "耗费0AP",
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
      section: "通用",
      title: "战斗通用提醒",
      lines: [
        "好人做坏事会立刻清零警官点，转为通缉犯",
        "平局算发起者胜,与NPC平局算发起者败，投降算发起者败",
        "警长/银行安保/匪徒 战斗时抽 5/4/3张战斗牌",
      ],
      tags: ["阵营", "警官点", "通缉"]
    },
    {
      section: "逮捕",
      title: "逮捕（警官玩家可对通缉玩家执行）",
      lines: [
        "发起时通缉玩家先弃一张牌",
        "发起者胜：警官玩家得1警官点；通缉玩家受1伤、补1牌、没收牛+半金+半钱（向上取整）、清空通缉点并进警局",
        "发起者败（含平局/投降）：警官玩家受1伤+抽1牌"
      ],
      tags: ["逮捕", "好人", "坏人", "警局"]
    },
    {
      section: "决斗",
      title: "决斗",
      lines: [
        "发起者胜：获得2 LP，对方受1伤+抽1牌",
        "发起者败（含平局/投降）：受1伤+抽1牌"
      ],
      tags: ["决斗", "LP"]
    },
    {
      section: "抢劫",
      title: "抢劫",
      lines: [
        "发起者胜：+1通缉点，并抢对方半钱或半金块（向上取整）",
        "发起者败（含平局/投降）：受1伤+抽1牌"
      ],
      tags: ["抢劫", "通缉", "金钱"]
    },
    {
      section: "打匪徒",
      title: "打匪徒（被动触发）",
      lines: [
        "匪徒抽3张战斗牌，选择一张打出",
        "胜利：移除匪徒；非通缉状态得 1LP 或 1警官点，通缉状态得 1LP",
        "失败（平局算败）：受1伤+抽1牌，并移除匪徒"
      ],
      tags: ["匪徒", "被动", "LP", "警官点"]
    },
    {
      section: "警长抓人",
      title: "警长抓人（被动触发）",
      lines: [
        "警长抽5张战斗牌，选择一张打出",
        "玩家胜：警长回警局，玩家无额外损失",
        "玩家败：受1伤+抽1牌，没收牛+半金+半钱，清空通缉点并进警局"
      ],
      tags: ["警长", "警局", "被动"]
    }
  ],
  locations: [
    {
      section: "通用",
      title: "地点通用规则",
      lines: ["绝大多数地点都可执行“收购”行动，使用 1AP 支付费用获取地契牌",
              "被通缉玩家无法进入警长办公室所在地块"
      ],
      tags: ["地契", "收购", "通用"]
    },
    {
      section: "牧场",
      title: "牧场",
      lines: [
        "套牛：使用 1AP 得 1牛标记 (携带上限为1；携带长角牛时移动力-1)",
        "运牛：在火车站提交牛标记，得1警官点+标记奖励(送长角牛无点数奖励)",
        "走私：在不同色牧场/逃犯据点提交牛标记，得1通缉点+标记奖励(送长角牛无点数奖励)"
      ],
      tags: ["牧场", "牛", "走私", "通缉"]
    },
    {
      section: "火车站",
      title: "火车站",
      lines: [
        "运牛：提交牛标记，得1警官点+标记奖励(送长角牛无点数奖励)",
        "乘车：使用 1AP，支付$10旅行至另一火车站，再使用剩余移动步数"
      ],
      tags: ["火车站", "牛", "警官点", "旅行"]
    },
    {
      section: "银行",
      title: "银行",
      lines: [
        "兑现金块：使用 1AP，每兑现1金块得 $20 + 1LP",
        "抢劫银行（每回合限1次）：使用 1AP，银行安保抓4牌打其中一张，玩家赢则+3通缉点并拿$80；输则+1通缉点、受1伤、抽1牌"
      ],
      tags: ["银行", "金块", "LP", "通缉"]
    },
    {
      section: "金矿",
      title: "金矿",
      lines: [
        "淘金：使用 1AP，掷2骰",
        "金块=拿1金块；$图示=拿$10；$带刷新=拿$10并重掷该骰；X=只挖到了沙砾，无事发生"
      ],
      tags: ["金矿", "淘金", "骰子"]
    },
    {
      section: "酒馆",
      title: "酒馆",
      lines: [
        "德州扑克：使用 1AP，投$10底注，抽1牌，庄家投$20底注，抽4张牌(同城镇玩家可加入)",
        "先翻3张公共牌，此时玩家可加注$10/$20，再翻1张公共牌，再次加注，最后翻1张公共牌(庄家永远会跟注)",
        "赢/平：拿所有底注，并得 1LP + 1赌博点，其余参与者抽1牌",
        "输：抽1牌"
      ],
      tags: ["酒馆", "扑克", "LP", "通缉"]
    },
    {
      section: "杂货店",
      title: "杂货店",
      lines: ["使用 1AP，可购买 / 升级任意数量物品"],
      tags: ["杂货店", "购买", "升级"]
    },
    {
      section: "诊所",
      title: "诊所",
      lines: ["使用 1AP，支付$10治愈全部伤害；每治愈1点伤害抽1张牌"],
      tags: ["诊所", "治疗", "抽牌"]
    },
    {
      section: "俱乐部",
      title: "俱乐部",
      lines: ["使用 1AP，支付$30获得 1LP，可重复执行"],
      tags: ["俱乐部", "LP"]
    },
    {
      section: "火车",
      title: "火车",
      lines: [
        "抢劫火车（每回合限1次）：使用 1AP，抽1张火车遭遇牌并与列车守卫战斗",
        "赢：获得卡牌指示奖励；输：承受失败惩罚并受1伤+抽1牌"
      ],
      tags: ["火车", "抢劫", "战斗"]
    },
    {
      section: "匪徒营地",
      title: "匪徒营地",
      lines: [
        "与匪徒战斗：抽3张战斗牌并与匪徒战斗",
        "走私：提交牛标记，得1通缉点+标记奖励(送长角牛无点数奖励)"
      ],
      tags: ["匪徒营地", "偷运", "牛"]
    },
    {
      section: "山洞隧道",
      title: "山洞隧道",
      lines: ["移动：使用 1AP，从一侧移动到另一侧，(行动后不能再次移动)"],
      tags: ["隧道", "移动"]
    },
    {
      section: "警长办公室",
      title: "警长办公室",
      lines: [
        "玩家被逮捕后会被送至此处，法警玩家也可在此招募帮手"
      ],
      tags: ["警长", "法警", "招募", "打工"]
    },
    {
      section: "旅行商人",
      title: "旅行商人",
      lines: [
        "购买：使用 1AP，提供购买或升级传奇物品、坐骑和武器的机会"
      ],
      tags: ["旅行商人", "区域行动", "购买", "升级"]
    }
    ,{
      section: "逃犯窝点",
      title: "逃犯窝点",
      lines: [
        "逃犯(存在时)战斗：抽n张战斗牌并与逃犯战斗(n在token后标明)",
        "套牛：使用 1AP 得 1长角牛标记 (携带上限为1,携带长角牛时移动力-1)",
        "走私：提交牛标记，得1通缉点+标记奖励(送长角牛无点数奖励)"
      ],
      tags: ["逃犯窝点", "偷运", "牛"]
    }
  ]
};

const appState = {
  activeTab: "turn",
  activeSub: {
    turn: null,
    actions: null,
    combat: null,
    locations: null
  },
  query: ""
};

const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));
const globalSearch = document.getElementById("globalSearch");

function uniqSections(items) {
  return [...new Set(items.map((item) => item.section))];
}

function cleanTitle(title) {
  return title.replace(/^[^\p{L}\p{N}]+/u, "").trim();
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setHighlightedText(element, text, query) {
  const value = String(text);
  const keyword = query.trim();

  element.textContent = "";
  if (!keyword) {
    element.textContent = value;
    return;
  }

  const matcher = new RegExp(`(${escapeRegExp(keyword)})`, "ig");
  const chunks = value.split(matcher);

  chunks.forEach((chunk) => {
    if (!chunk) return;
    if (chunk.toLowerCase() === keyword.toLowerCase()) {
      const mark = document.createElement("mark");
      mark.className = "kw-highlight";
      mark.textContent = chunk;
      element.appendChild(mark);
      return;
    }
    element.appendChild(document.createTextNode(chunk));
  });
}

function getCardIcon(tab, item) {
  if (tab === "turn") {
    if (item.section === "开始") return "sunrise";
    if (item.section === "行动") return "play";
    if (item.section === "结束") return "sunset";
    return "clock-3";
  }

  if (tab === "actions") {
    if (item.section === "耗费1AP") return "hexagon-number-1";
    if (item.section === "耗费0AP") return "hexagon-number-0";
    if (item.section === "冒险骰") return "dices";
    return "zap";
  }

  if (tab === "combat") {
    if (item.section === "逮捕") return "columns-4";
    if (item.section === "决斗") return "swords";
    if (item.section === "抢劫") return "hand-coins";
    if (item.section === "打匪徒") return "hat-glasses";
    if (item.section === "警长抓人") return "siren";
    return "alert-triangle";
  }

  if (tab === "locations") {
    if (item.section === "通用") return "alert-triangle";
    if (item.section === "牧场") return "carrot";
    if (item.section === "火车站") return "train-track";
    if (item.section === "银行") return "badge-dollar-sign";
    if (item.section === "金矿") return "pickaxe";
    if (item.section === "酒馆") return "club";
    if (item.section === "杂货店") return "barrel";
    if (item.section === "诊所") return "building-hospital";
    if (item.section === "俱乐部") return "drama";
    if (item.section === "火车") return "train";
    if (item.section === "逃犯窝点") return "tent-tree";
    if (item.section === "山洞隧道") return "building-tunnel";
    if (item.section === "警长办公室") return "square-star";
    if (item.section === "旅行商人") return "baggage-claim";
    if (item.section === "匪徒营地") return "flame-kindling";
    return "map-pin";
  }

  return "book-open";
}

function createTablerBuildingTunnelIcon() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(SVG_NS, "svg");

  svg.setAttribute("xmlns", SVG_NS);
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.75");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("class", "icon icon-tabler icons-tabler-outline icon-tabler-building-tunnel");

  const bgPath = document.createElementNS(SVG_NS, "path");
  bgPath.setAttribute("stroke", "none");
  bgPath.setAttribute("d", "M0 0h24v24H0z");
  bgPath.setAttribute("fill", "none");
  svg.appendChild(bgPath);

  const pathData = [
    "M5 21h14a2 2 0 0 0 2 -2v-7a9 9 0 0 0 -18 0v7a2 2 0 0 0 2 2",
    "M8 21v-9a4 4 0 1 1 8 0v9",
    "M3 17h4",
    "M17 17h4",
    "M21 12h-4",
    "M7 12h-4",
    "M12 3v5",
    "M6 6l3 3",
    "M15 9l3 -3l-3 3"
  ];

  pathData.forEach((d) => {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    svg.appendChild(p);
  });

  return svg;
}

function createTablerBuildingHospitalIcon() {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(SVG_NS, "svg");

  svg.setAttribute("xmlns", SVG_NS);
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.75");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("class", "icon icon-tabler icons-tabler-outline icon-tabler-building-hospital");

  const bgPath = document.createElementNS(SVG_NS, "path");
  bgPath.setAttribute("stroke", "none");
  bgPath.setAttribute("d", "M0 0h24v24H0z");
  bgPath.setAttribute("fill", "none");
  svg.appendChild(bgPath);

  const pathData = [
    "M3 21l18 0",
    "M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16",
    "M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4",
    "M10 9l4 0",
    "M12 7l0 4"
  ];

  pathData.forEach((d) => {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    svg.appendChild(p);
  });

  return svg;
}

function createTablerHexagonIcon(name) {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(SVG_NS, "svg");

  svg.setAttribute("xmlns", SVG_NS);
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("class", `icon icon-tabler icons-tabler-filled icon-tabler-${name}`);

  const bgPath = document.createElementNS(SVG_NS, "path");
  bgPath.setAttribute("stroke", "none");
  bgPath.setAttribute("d", "M0 0h24v24H0z");
  bgPath.setAttribute("fill", "none");
  svg.appendChild(bgPath);

  const iconPath = document.createElementNS(SVG_NS, "path");
  iconPath.setAttribute(
    "d",
    name === "hexagon-number-0"
      ? "M10.425 1.414a3.33 3.33 0 0 1 3.216 0l6.775 3.995c.067 .04 .127 .084 .18 .133l.008 .007l.107 .076a3.223 3.223 0 0 1 1.284 2.39l.005 .203v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.226 3.226 0 0 1 -1.678 -2.826v-7.285a3.21 3.21 0 0 1 1.65 -2.808zm1.575 5.586a3 3 0 0 0 -2.995 2.824l-.005 .176v4l.005 .176a3 3 0 0 0 5.99 0l.005 -.176v-4l-.005 -.176a3 3 0 0 0 -2.995 -2.824zm0 2a1 1 0 0 1 .993 .883l.007 .117v4l-.007 .117a1 1 0 0 1 -1.986 0l-.007 -.117v-4l.007 -.117a1 1 0 0 1 .993 -.883z"
      : "M10.425 1.414a3.33 3.33 0 0 1 3.216 0l6.775 3.995c.067 .04 .127 .084 .18 .133l.008 .007l.107 .076a3.223 3.223 0 0 1 1.284 2.39l.005 .203v7.284c0 1.175 -.643 2.256 -1.623 2.793l-6.804 4.302c-.98 .538 -2.166 .538 -3.2 -.032l-6.695 -4.237a3.226 3.226 0 0 1 -1.678 -2.826v-7.285a3.21 3.21 0 0 1 1.65 -2.808zm.952 5.803l-.084 .076l-2 2l-.083 .094a1 1 0 0 0 0 1.226l.083 .094l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l.293 -.293v5.586l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-8l-.006 -.114c-.083 -.777 -1.008 -1.16 -1.617 -.67z"
  );
  svg.appendChild(iconPath);

  return svg;
}

function createIconNode(iconName) {
  if (iconName === "hexagon-number-0" || iconName === "hexagon-number-1") {
    return createTablerHexagonIcon(iconName);
  }

  if (iconName === "building-tunnel") {
    return createTablerBuildingTunnelIcon();
  }

  if (iconName === "building-hospital") {
    return createTablerBuildingHospitalIcon();
  }

  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", iconName);
  return icon;
}

function refreshLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function createRuleCard(item, tab, query) {
  const card = document.createElement("article");
  card.className = "rule-card";

  const title = document.createElement("h3");
  title.className = "rule-title";

  const icon = createIconNode(getCardIcon(tab, item));

  const text = document.createElement("span");
  setHighlightedText(text, cleanTitle(item.title), query);

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
      setHighlightedText(lineText, line, query);

      lineRow.appendChild(lineIcon);
      lineRow.appendChild(lineText);
      card.appendChild(lineRow);
      return;
    }

    const p = document.createElement("p");
    setHighlightedText(p, `• ${line}`, query);
    card.appendChild(p);
  });

  return card;
}

function textForSearch(item) {
  return [item.title, ...item.lines].join(" ").toLowerCase();
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
  const rawQuery = appState.query.trim();
  const query = rawQuery.toLowerCase();

  let items = DATA[tab];
  if (sectionFilter) {
    items = items.filter((item) => item.section === sectionFilter);
  }
  if (query) {
    items = items.filter((item) => textForSearch(item).includes(query));
  }

  holder.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = "<p>无匹配结果，试试切换子菜单</p>";
    holder.appendChild(empty);
    return;
  }

  items.forEach((item) => holder.appendChild(createRuleCard(item, tab, rawQuery)));
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

  if (DATA[appState.activeTab]) {
    renderTabContent(appState.activeTab);
  }
});

globalSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    globalSearch.blur();
  }
});

Object.keys(DATA).forEach((tab) => {
  renderSubNav(tab);
  renderTabContent(tab);
});
setActiveTab("turn");
refreshLucideIcons();