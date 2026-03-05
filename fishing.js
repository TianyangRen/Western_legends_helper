const STORAGE_KEY = "wl-fishing-state-v1";
const DATA_URL = "Expansions/Fishing_v5/fish-cards.json";
const CARD_BACK = "Expansions/Fishing_v5/back.jpg";

const PLAYER_COLORS = [
  { id: "red", label: "红", hex: "#d73a33", text: "#ffffff" },
  { id: "blue", label: "蓝", hex: "#2d82ff", text: "#ffffff" },
  { id: "yellow", label: "黄", hex: "#f2ce3f", text: "#1a1a1a" },
  { id: "purple", label: "紫", hex: "#7a45db", text: "#ffffff" },
  { id: "black", label: "黑", hex: "#1f1f23", text: "#ffffff" },
  { id: "white", label: "白", hex: "#eef4f6", text: "#111111" }
];

const DOCK_POSITIONS = [
  "pos-left-top",
  "pos-left-mid",
  "pos-left-bottom",
  "pos-right-top",
  "pos-right-mid",
  "pos-right-bottom"
];

const dom = {};
const state = {
  catalog: [],
  catalogMap: new Map(),
  runtime: {
    setupColors: ["red", "blue"],
    selectedPlayerId: null,
    reelingInProgress: false
  },
  game: getDefaultGame()
};

function getDefaultGame() {
  return {
    version: 1,
    initialized: false,
    players: [],
    drawPile: [],
    discardPile: [],
    action: null,
    lastMessage: "请先进入设置并生成鱼池。",
    variants: {
      legendaryRun: false,
      limitedPool: false,
      pressYourLuck: false,
      takeTheBait: false
    }
  };
}

window.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheDom();
  bindBaseEvents();
  await loadCatalog();
  loadState();
  initSetupControls();
  renderAll();

  if (!state.game.initialized) {
    openSetup();
  }
}

function cacheDom() {
  dom.fishingApp = document.getElementById("fishingApp");
  dom.drawCount = document.getElementById("drawCount");
  dom.discardCount = document.getElementById("discardCount");
  dom.hubStatus = document.getElementById("hubStatus");
  dom.playerDock = document.getElementById("playerDock");
  dom.startFishingBtn = document.getElementById("startFishingBtn");

  dom.setupOverlay = document.getElementById("setupOverlay");
  dom.openSetupBtn = document.getElementById("openSetupBtn");
  dom.closeSetupBtn = document.getElementById("closeSetupBtn");
  dom.playerCount = document.getElementById("playerCount");
  dom.seatSlots = document.getElementById("seatSlots");
  dom.generateGameBtn = document.getElementById("generateGameBtn");
  dom.resetStorageBtn = document.getElementById("resetStorageBtn");

  dom.playerOverlay = document.getElementById("playerOverlay");
  dom.playerPanelTitle = document.getElementById("playerPanelTitle");
  dom.playerPanelBody = document.getElementById("playerPanelBody");
  dom.closePlayerPanelBtn = document.getElementById("closePlayerPanelBtn");
  dom.discardSelectedBtn = document.getElementById("discardSelectedBtn");
  dom.sellSelectedBtn = document.getElementById("sellSelectedBtn");

  dom.fishingOverlay = document.getElementById("fishingOverlay");
  dom.fishingFlowTitle = document.getElementById("fishingFlowTitle");
  dom.fishingContent = document.getElementById("fishingContent");
  dom.closeFishingBtn = document.getElementById("closeFishingBtn");
}

function bindBaseEvents() {
  dom.openSetupBtn.addEventListener("click", openSetup);
  dom.closeSetupBtn.addEventListener("click", closeSetup);
  dom.generateGameBtn.addEventListener("click", generateGameFromSetup);
  dom.resetStorageBtn.addEventListener("click", resetLocalGame);

  dom.closePlayerPanelBtn.addEventListener("click", closePlayerPanel);
  dom.discardSelectedBtn.addEventListener("click", discardSelectedFromPanel);
  dom.sellSelectedBtn.addEventListener("click", sellSelectedFromPanel);

  dom.startFishingBtn.addEventListener("click", openFishingFlow);
  dom.closeFishingBtn.addEventListener("click", closeFishingFlow);

  dom.setupOverlay.addEventListener("click", (event) => {
    if (event.target === dom.setupOverlay) {
      closeSetup();
    }
  });

  dom.playerOverlay.addEventListener("click", (event) => {
    if (event.target === dom.playerOverlay) {
      closePlayerPanel();
    }
  });

  dom.fishingOverlay.addEventListener("click", (event) => {
    if (event.target === dom.fishingOverlay) {
      closeFishingFlow();
    }
  });
}

async function loadCatalog() {
  const response = await fetch(DATA_URL);
  const cards = await response.json();
  state.catalog = cards;
  state.catalogMap = new Map(cards.map((card) => [card.id, card]));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state.game = getDefaultGame();
      return;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.drawPile) || !Array.isArray(parsed.players)) {
      state.game = getDefaultGame();
      return;
    }

    state.game = parsed;

    if (state.game.players.length >= 2) {
      state.runtime.setupColors = state.game.players.map((player) => player.colorId);
    }
  } catch (_) {
    state.game = getDefaultGame();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.game));
}

function initSetupControls() {
  dom.playerCount.innerHTML = "";
  for (let i = 2; i <= 6; i += 1) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `${i} 人`;
    dom.playerCount.append(option);
  }

  dom.playerCount.addEventListener("change", () => {
    const count = Number(dom.playerCount.value);
    syncSetupColors(count);
    renderSetupSeats();
  });
}

function openSetup() {
  const existingCount = state.game.players.length >= 2 ? state.game.players.length : 2;
  dom.playerCount.value = String(existingCount);
  syncSetupColors(existingCount);
  renderSetupSeats();
  dom.setupOverlay.classList.remove("hidden");
}

function closeSetup() {
  dom.setupOverlay.classList.add("hidden");
}

function syncSetupColors(count) {
  const defaultPool = PLAYER_COLORS.map((color) => color.id);
  const current = [...state.runtime.setupColors];

  while (current.length < count) {
    const next = defaultPool.find((colorId) => !current.includes(colorId));
    current.push(next || "red");
  }

  state.runtime.setupColors = current.slice(0, count);
}

function renderSetupSeats() {
  dom.seatSlots.innerHTML = "";
  const count = Number(dom.playerCount.value);

  for (let seatIndex = 0; seatIndex < count; seatIndex += 1) {
    const wrapper = document.createElement("div");
    wrapper.className = "seat-slot";

    const label = document.createElement("label");
    label.textContent = `座位 ${seatIndex + 1}`;

    const select = document.createElement("select");
    select.dataset.seatIndex = String(seatIndex);

    PLAYER_COLORS.forEach((color) => {
      const option = document.createElement("option");
      option.value = color.id;
      option.textContent = `${color.label}色`;
      select.append(option);
    });

    select.value = state.runtime.setupColors[seatIndex] || PLAYER_COLORS[seatIndex].id;

    select.addEventListener("change", (event) => {
      const index = Number(event.target.dataset.seatIndex);
      state.runtime.setupColors[index] = event.target.value;
      renderSetupSeats();
    });

    const usedByAnother = new Set(state.runtime.setupColors.filter((_, idx) => idx !== seatIndex));
    Array.from(select.options).forEach((option) => {
      option.disabled = usedByAnother.has(option.value);
    });

    wrapper.append(label, select);
    dom.seatSlots.append(wrapper);
  }

  const uniqueCount = new Set(state.runtime.setupColors.slice(0, count)).size;
  const complete = uniqueCount === count;
  dom.generateGameBtn.disabled = !complete;
}

function generateGameFromSetup() {
  const count = Number(dom.playerCount.value);
  const picked = state.runtime.setupColors.slice(0, count);

  if (new Set(picked).size !== count) {
    setHubMessage("颜色不能重复，请调整后再开始。");
    renderHub();
    return;
  }

  state.game.players = picked.map((colorId, index) => {
    const color = getColorById(colorId);
    return {
      playerId: `p${index + 1}`,
      colorId,
      name: `${color.label}玩家`,
      creel: []
    };
  });

  const ids = state.catalog.map((card) => card.id);
  state.game.drawPile = shuffle(ids);
  state.game.discardPile = [];
  state.game.action = null;
  state.game.initialized = true;
  setHubMessage(`公共鱼池已生成，共 ${state.game.drawPile.length} 张。`);

  saveState();
  closeSetup();
  renderAll();
}

function resetLocalGame() {
  localStorage.removeItem(STORAGE_KEY);
  state.game = getDefaultGame();
  state.runtime.selectedPlayerId = null;
  state.runtime.reelingInProgress = false;
  syncSetupColors(2);
  renderAll();
  openSetup();
}

function renderAll() {
  renderHub();
  renderDock();

  if (!dom.playerOverlay.classList.contains("hidden")) {
    renderPlayerPanel();
  }

  if (!dom.fishingOverlay.classList.contains("hidden")) {
    renderFishingFlow();
  }
}

function renderHub() {
  dom.drawCount.textContent = String(state.game.drawPile.length);
  dom.discardCount.textContent = String(state.game.discardPile.length);
  dom.hubStatus.textContent = state.game.lastMessage;
  dom.startFishingBtn.disabled = !state.game.initialized || state.game.players.length === 0;
}

function setHubMessage(message) {
  state.game.lastMessage = message;
}

function renderDock() {
  dom.playerDock.innerHTML = "";

  state.game.players.forEach((player, index) => {
    const color = getColorById(player.colorId);
    const chipColor = getDockChipColor(player.colorId);
    const totals = getPlayerCreelTotals(player);
    const chip = document.createElement("button");
    chip.className = `player-chip ${DOCK_POSITIONS[index] || DOCK_POSITIONS[DOCK_POSITIONS.length - 1]}`;
    chip.style.background = chipColor;
    chip.style.color = color.text;
    chip.innerHTML = `<span>${player.name}</span><small>点数 ${totals.might} | $${totals.money} | 🐟 ${player.creel.length}/5</small>`;

    chip.addEventListener("click", () => {
      state.runtime.selectedPlayerId = player.playerId;
      openPlayerPanel();
    });

    dom.playerDock.append(chip);
  });
}

function openPlayerPanel() {
  dom.playerOverlay.classList.remove("hidden");
  renderPlayerPanel();
}

function closePlayerPanel() {
  dom.playerOverlay.classList.add("hidden");
}

function renderPlayerPanel() {
  const player = getPlayerById(state.runtime.selectedPlayerId);
  if (!player) {
    dom.playerPanelBody.innerHTML = "<div class=\"notice\">未找到玩家。</div>";
    dom.discardSelectedBtn.disabled = true;
    dom.sellSelectedBtn.disabled = true;
    return;
  }

  const color = getColorById(player.colorId);
  dom.playerPanelTitle.textContent = `${player.name} - 鱼篓 (${player.creel.length}/5)`;

  const modal = dom.playerOverlay.querySelector(".player-modal");
  modal.style.borderColor = color.hex;

  if (player.creel.length === 0) {
    dom.playerPanelBody.innerHTML = "<div class=\"notice\">鱼篓为空。</div>";
    dom.discardSelectedBtn.disabled = true;
    dom.sellSelectedBtn.disabled = true;
    return;
  }

  dom.playerPanelBody.innerHTML = player.creel
    .map((cardId) => renderPanelCard(cardId, "panel-check"))
    .join("");

  dom.discardSelectedBtn.disabled = false;
  dom.sellSelectedBtn.disabled = false;
}

function renderPanelCard(cardId, inputClassName) {
  const card = getCard(cardId);
  if (!card) return "";

  return `
    <label class="panel-card">
      <img src="${card.image}" alt="${card.name}" />
      <h3>${card.name}</h3>
      <p>点数 ${card.might} | 价格 $${card.price}</p>
      <input type="checkbox" class="${inputClassName}" value="${card.id}" />
    </label>
  `;
}

function getCheckedValues(selector) {
  return Array.from(document.querySelectorAll(selector))
    .filter((element) => element.checked)
    .map((element) => element.value);
}

function discardSelectedFromPanel() {
  const picked = getCheckedValues(".panel-check");
  if (picked.length === 0) return;

  const player = getPlayerById(state.runtime.selectedPlayerId);
  if (!player) return;

  player.creel = player.creel.filter((cardId) => !picked.includes(cardId));
  picked.forEach((cardId) => moveCardToDiscard(cardId, "discard"));

  setHubMessage(`${player.name} 丢弃了 ${picked.length} 张鱼牌。`);
  saveState();
  renderAll();
}

function sellSelectedFromPanel() {
  const picked = getCheckedValues(".panel-check");
  if (picked.length === 0) return;

  const player = getPlayerById(state.runtime.selectedPlayerId);
  if (!player) return;

  const total = picked.reduce((sum, cardId) => sum + (getCard(cardId)?.price || 0), 0);
  const payout = Math.floor(total / 10) * 10;

  player.creel = player.creel.filter((cardId) => !picked.includes(cardId));
  picked.forEach((cardId) => moveCardToDiscard(cardId, "sell"));

  setHubMessage(`${player.name} 在牧场出售 ${picked.length} 张鱼，结算 $${payout}。`);
  saveState();
  renderAll();
}

function openFishingFlow() {
  if (!state.game.initialized || state.game.players.length === 0) {
    setHubMessage("请先完成设置。");
    renderHub();
    return;
  }

  dom.fishingOverlay.classList.remove("hidden");
  renderFishingFlow();
}

function closeFishingFlow() {
  if (state.runtime.reelingInProgress) return;
  dom.fishingOverlay.classList.add("hidden");
}

function renderFishingFlow() {
  const action = state.game.action;
  if (!action) {
    renderFishingIdentityStep();
    return;
  }

  const player = getPlayerById(action.playerId);
  if (player) {
    const color = getColorById(player.colorId);
    dom.fishingFlowTitle.textContent = `钓鱼行动流 - ${player.name}`;
    dom.fishingOverlay.querySelector(".fishing-modal").style.borderColor = color.hex;
  }

  if (action.step === "steeling") {
    renderSteelingStep(action);
  } else if (action.step === "reeling") {
    renderReelingStep(action);
  } else if (action.step === "creeling") {
    renderCreelingStep(action);
  }
}

function renderFishingIdentityStep() {
  dom.fishingFlowTitle.textContent = "钓鱼行动流";

  const buttons = state.game.players
    .map((player) => {
      const color = getColorById(player.colorId);
      return `<button class="player-btn" data-fisher="${player.playerId}" style="background:${color.hex};color:${color.text}">${player.name}</button>`;
    })
    .join("");

  dom.fishingContent.innerHTML = `
    <section class="step-block">
      <h3>Step 1: 身份确认</h3>
      <p>请选择是谁在钓鱼？</p>
      <div class="player-options">${buttons}</div>
    </section>
  `;

  dom.fishingContent.querySelectorAll("[data-fisher]").forEach((button) => {
    button.addEventListener("click", () => startSteeling(button.dataset.fisher));
  });
}

function startSteeling(playerId) {
  state.game.action = {
    playerId,
    step: "steeling",
    discardedPokerCard: null,
    discardedFishIds: [],
    targetEffort: 0,
    reelTotal: 0,
    drawnIds: [],
    pendingFishIds: [],
    currentFishIndex: 0,
    exactMatch: false,
    creelingSummary: getEmptyCreelingSummary()
  };

  setHubMessage(`已开始 ${getPlayerById(playerId)?.name || "玩家"} 的钓鱼行动。`);
  saveState();
  renderAll();
}

function renderSteelingStep(action) {
  const player = getPlayerById(action.playerId);
  const options = player.creel
    .map((cardId) => {
      const card = getCard(cardId);
      return `
        <label class="creel-choice">
          <img src="${card.image}" alt="${card.name}" />
          <span>${card.name} (+1)</span>
          <input type="checkbox" class="steeling-fish" value="${card.id}" />
        </label>
      `;
    })
    .join("");

  const selectedRank = action.discardedPokerCard?.rank || "";
  const selectedSuit = action.discardedPokerCard?.suit || "spades";
  const pokerCardInput = renderPokerCardInput(selectedRank, selectedSuit);

  dom.fishingContent.innerHTML = `
    <section class="step-block">
      <h3>Step 2: 蓄力 (Steeling)</h3>
      <div class="form-row">
        <label>弃掉的扑克牌（只能 1 张，选择点数和花色）</label>
        <div class="poker-rows">${pokerCardInput}</div>
      </div>
      <p id="pokerSummary" class="notice">当前扑克牌点数合计：0</p>
      <p class="notice">弃掉鱼篓中的鱼，每张 +1 点，且会进入公共弃牌堆。</p>
      <div class="creel-choice-grid">${options || "<div class=\"notice\">鱼篓为空，无法用弃鱼加成。</div>"}</div>
      <div class="modal-actions">
        <button id="confirmSteelingBtn" class="launch-btn" type="button">确认目标点数</button>
      </div>
    </section>
  `;

  const pokerRowEl = document.getElementById("singlePokerRow");
  const pokerSummaryEl = document.getElementById("pokerSummary");

  const updatePokerSummary = () => {
    const parsed = parseSinglePokerCard(pokerRowEl);
    pokerSummaryEl.textContent = `当前扑克牌点数：${parsed.value}`;
  };

  pokerRowEl.querySelectorAll(".poker-rank, .poker-suit").forEach((select) => {
    select.addEventListener("change", updatePokerSummary);
  });

  updatePokerSummary();

  const confirmBtn = document.getElementById("confirmSteelingBtn");
  confirmBtn.addEventListener("click", () => {
    const pokerParseResult = parseSinglePokerCard(pokerRowEl);
    if (!pokerParseResult.rank || pokerParseResult.value === 0) {
      setHubMessage("请先选择扑克牌点数。");
      renderHub();
      return;
    }

    const selectedFish = getCheckedValues(".steeling-fish");
    player.creel = player.creel.filter((cardId) => !selectedFish.includes(cardId));
    selectedFish.forEach((cardId) => moveCardToDiscard(cardId, "steeling"));

    action.discardedPokerCard = pokerParseResult;
    action.discardedFishIds = selectedFish;
    action.targetEffort = pokerParseResult.value + selectedFish.length;
    action.reelTotal = 0;
    action.drawnIds = [];
    action.step = "reeling";

    setHubMessage(`${player.name} 的目标钓鱼点数为 ${action.targetEffort}。`);
    saveState();
    renderAll();
  });
}

function renderPokerCardInput(selectedRank, selectedSuit) {
  const ranks = ["", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const suits = [
    { id: "spades", label: "黑桃 ♠" },
    { id: "clubs", label: "梅花 ♣" },
    { id: "hearts", label: "红桃 ♥" },
    { id: "diamonds", label: "方块 ♦" }
  ];

  const rankOptions = ranks
    .map((rank) => {
      const label = rank || "请选择点数";
      const selected = rank === selectedRank ? "selected" : "";
      return `<option value="${rank}" ${selected}>${label}</option>`;
    })
    .join("");

  const suitOptions = suits
    .map((suit) => {
      const selected = suit.id === selectedSuit ? "selected" : "";
      return `<option value="${suit.id}" ${selected}>${suit.label}</option>`;
    })
    .join("");

  return `
    <div id="singlePokerRow" class="poker-card-row">
      <select class="poker-rank">${rankOptions}</select>
      <select class="poker-suit">${suitOptions}</select>
    </div>
  `;
}

function parseSinglePokerCard(container) {
  const rank = container.querySelector(".poker-rank")?.value || "";
  const suit = container.querySelector(".poker-suit")?.value || "spades";
  const value = getPokerRankValue(rank);

  return {
    rank,
    suit,
    value,
    color: getSuitColor(suit)
  };
}

function getPokerRankValue(rank) {
  if (rank === "A") return 11;
  if (rank === "K" || rank === "Q" || rank === "J") return 10;
  const numeric = Number(rank);
  return Number.isFinite(numeric) ? numeric : 0;
}

function getSuitColor(suit) {
  return suit === "hearts" || suit === "diamonds" ? "red" : "black";
}

function renderReelingStep(action) {
  const cards = action.drawnIds
    .map((cardId) => renderFlipCard(cardId))
    .join("");

  dom.fishingContent.innerHTML = `
    <section class="step-block">
      <h3>Step 3: 收线 (Reeling)</h3>
      <p>目标点数：<strong>${action.targetEffort}</strong> | 当前累计：<strong>${action.reelTotal}</strong></p>
      <div class="notice">逐张翻牌直到点数达到或超过目标。若超出，最后一张将被弃置。</div>
      <div class="reveal-row">${cards || "<div class=\"notice\">点击下方按钮开始收线。</div>"}</div>
      <div class="modal-actions">
        <button id="runReelingBtn" class="launch-btn" type="button" ${state.runtime.reelingInProgress ? "disabled" : ""}>${state.runtime.reelingInProgress ? "收线中..." : "开始收线"}</button>
      </div>
    </section>
  `;

  document.getElementById("runReelingBtn").addEventListener("click", runReelingSequence);
}

function renderFlipCard(cardId) {
  const card = getCard(cardId);
  return `
    <div class="flip-card revealed">
      <div class="flip-inner">
        <div class="flip-face flip-back"><img src="${CARD_BACK}" alt="back" /></div>
        <div class="flip-face flip-front"><img src="${card.image}" alt="${card.name}" /></div>
      </div>
    </div>
  `;
}

async function runReelingSequence() {
  if (state.runtime.reelingInProgress) return;
  const action = state.game.action;
  if (!action || action.step !== "reeling") return;

  state.runtime.reelingInProgress = true;
  renderFishingFlow();

  while (action.reelTotal < action.targetEffort) {
    const cardId = drawOneCard();
    if (!cardId) break;

    action.drawnIds.push(cardId);
    action.reelTotal += getCard(cardId).might;

    saveState();
    renderFishingFlow();
    await wait(520);
  }

  if (action.reelTotal > action.targetEffort && action.drawnIds.length > 0) {
    const overflowCard = action.drawnIds.pop();
    action.reelTotal -= getCard(overflowCard).might;
    moveCardToDiscard(overflowCard, "reel-overflow");
  }

  const pendingFishIds = [];
  action.drawnIds.forEach((cardId) => {
    const card = getCard(cardId);
    if (card.isFish && !card.isWeed) {
      pendingFishIds.push(cardId);
    } else {
      moveCardToDiscard(cardId, "reel-junk");
    }
  });

  action.pendingFishIds = pendingFishIds;
  action.currentFishIndex = 0;
  action.exactMatch = action.reelTotal === action.targetEffort && pendingFishIds.length > 0;
  action.step = "creeling";

  if (action.exactMatch) {
    setHubMessage("收线点数刚好命中！请在线下为该玩家 +1 LP。");
  } else {
    setHubMessage("收线完成，进入入篓结算。");
  }

  state.runtime.reelingInProgress = false;
  saveState();
  renderAll();
}

function renderCreelingStep(action) {
  const player = getPlayerById(action.playerId);

  if (!action.creelingSummary) {
    action.creelingSummary = getEmptyCreelingSummary();
  }

  if (player.creel.length > 5) {
    renderOverflowStep(player);
    return;
  }

  const remaining = action.pendingFishIds.length;
  if (remaining <= 0) {
    const summary = action.creelingSummary;
    dom.fishingContent.innerHTML = `
      <section class="step-block">
        <h3>Step 4: 入篓结算完成</h3>
        <p>本次钓鱼行动已处理完毕。</p>
        <div class="creel-choice-grid">
          <article class="panel-card">
            <h3>保留</h3>
            <p>张数 ${summary.keep.count}</p>
            <p>点数合计 ${summary.keep.might}</p>
            <p>价格合计 $${summary.keep.price}</p>
          </article>
          <article class="panel-card">
            <h3>丢弃</h3>
            <p>张数 ${summary.cull.count}</p>
            <p>点数合计 ${summary.cull.might}</p>
            <p>价格合计 $${summary.cull.price}</p>
          </article>
          <article class="panel-card">
            <h3>食用</h3>
            <p>张数 ${summary.consume.count}</p>
            <p>点数合计 ${summary.consume.might}</p>
            <p>价格合计 $${summary.consume.price}</p>
          </article>
        </div>
        <div class="modal-actions">
          <button id="finishFishingTurnBtn" class="launch-btn" type="button">结束回合并返回主控制台</button>
        </div>
      </section>
    `;

    document.getElementById("finishFishingTurnBtn").addEventListener("click", finishFishingTurn);
    return;
  }

  const cardRows = action.pendingFishIds
    .map((cardId) => {
      const card = getCard(cardId);
      return `
        <article class="panel-card creeling-item" data-card-id="${card.id}">
          <img src="${card.image}" alt="${card.name}" />
          <h3>${card.name}</h3>
          <p>点数 ${card.might} | 价格 $${card.price}</p>
          <div class="action-row">
            <button class="launch-btn creeling-choice" data-choice="keep" data-card-id="${card.id}" type="button">保留</button>
            <button class="ghost-btn creeling-choice" data-choice="cull" data-card-id="${card.id}" type="button">丢弃</button>
            <button class="ghost-btn creeling-choice" data-choice="consume" data-card-id="${card.id}" type="button">食用</button>
          </div>
        </article>
      `;
    })
    .join("");

  dom.fishingContent.innerHTML = `
    <section class="step-block">
      <h3>Step 4: 入篓结算 (Creeling)</h3>
      <p>剩余待处理：${remaining} 张</p>
      <p class="notice">可上下滚动查看所有待结算鱼牌，并逐条处理。</p>
      <div class="creeling-scroll-list">
        ${cardRows}
      </div>
    </section>
  `;

  dom.fishingContent.querySelectorAll(".creeling-choice").forEach((button) => {
    button.addEventListener("click", () => {
      resolveCreelingChoice(action, player, button.dataset.cardId, button.dataset.choice);
    });
  });
}

function resolveCreelingChoice(action, player, cardId, choice) {
  const card = getCard(cardId);
  if (!card) return;

  if (!action.pendingFishIds.includes(cardId)) return;

  if (!action.creelingSummary) {
    action.creelingSummary = getEmptyCreelingSummary();
  }

  const summaryType = choice === "keep" ? "keep" : choice === "consume" ? "consume" : "cull";
  action.creelingSummary[summaryType].count += 1;
  action.creelingSummary[summaryType].might += Number(card.might || 0);
  action.creelingSummary[summaryType].price += Number(card.price || 0);

  if (choice === "keep") {
    player.creel.push(cardId);
    setHubMessage(`${player.name} 保留了 ${card.name}。`);
  } else if (choice === "consume") {
    moveCardToDiscard(cardId, "consume");
    setHubMessage(`${player.name} 食用了 ${card.name}。`);
  } else {
    moveCardToDiscard(cardId, "cull");
    setHubMessage(`${player.name} 丢弃了 ${card.name}。`);
  }

  action.pendingFishIds = action.pendingFishIds.filter((id) => id !== cardId);
  action.currentFishIndex = 0;

  saveState();
  renderAll();
}

function renderOverflowStep(player) {
  const overflowCount = player.creel.length - 5;
  const options = player.creel
    .map((cardId) => {
      const card = getCard(cardId);
      return `
        <button class="creel-choice overflow-choice" data-card-id="${card.id}" type="button">
          <img src="${card.image}" alt="${card.name}" />
          <span>${card.name}</span>
        </button>
      `;
    })
    .join("");

  dom.fishingContent.innerHTML = `
    <section class="step-block">
      <h3>鱼篓超上限警告</h3>
      <p class="notice warn">${player.name} 当前鱼篓 ${player.creel.length}/5，请至少丢弃 ${overflowCount} 张后才能继续。</p>
      <p id="overflowSelectionHint" class="notice">当前已选择：0 张</p>
      <div class="creel-choice-grid">${options}</div>
      <div class="modal-actions">
        <button id="resolveOverflowBtn" class="launch-btn" type="button">丢弃所选并继续</button>
      </div>
    </section>
  `;

  const overflowChoices = Array.from(dom.fishingContent.querySelectorAll(".overflow-choice"));
  const overflowSelectionHint = document.getElementById("overflowSelectionHint");

  const updateOverflowSelectionHint = () => {
    const count = overflowChoices.filter((choice) => choice.classList.contains("selected")).length;
    overflowSelectionHint.textContent = `当前已选择：${count} 张`;
  };

  overflowChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      choice.classList.toggle("selected");
      updateOverflowSelectionHint();
    });
  });

  updateOverflowSelectionHint();

  document.getElementById("resolveOverflowBtn").addEventListener("click", () => {
    const selected = overflowChoices
      .filter((choice) => choice.classList.contains("selected"))
      .map((choice) => choice.dataset.cardId);

    if (selected.length < overflowCount) {
      setHubMessage(`请至少选择 ${overflowCount} 张进行丢弃。`);
      renderHub();
      return;
    }

    player.creel = player.creel.filter((cardId) => !selected.includes(cardId));
    selected.forEach((cardId) => moveCardToDiscard(cardId, "overflow"));

    setHubMessage(`${player.name} 已处理鱼篓超上限。`);
    saveState();
    renderAll();
  });
}

function finishFishingTurn() {
  const action = state.game.action;
  const player = action ? getPlayerById(action.playerId) : null;

  state.game.action = null;
  setHubMessage(`${player?.name || "玩家"} 的钓鱼行动结束，已返回主控制台。`);
  saveState();
  renderAll();
  closeFishingFlow();
}

function drawOneCard() {
  if (state.game.drawPile.length === 0 && state.game.discardPile.length > 0) {
    state.game.drawPile = shuffle([...state.game.discardPile]);
    state.game.discardPile = [];
  }

  if (state.game.drawPile.length === 0) {
    return null;
  }

  return state.game.drawPile.pop();
}

function moveCardToDiscard(cardId, reason) {
  const card = getCard(cardId);
  if (!card) return;

  if (card.isLegendary && !state.game.variants.legendaryRun) {
    return;
  }

  if (state.game.variants.limitedPool && (reason === "sell" || reason === "consume")) {
    return;
  }

  state.game.discardPile.push(cardId);
}

function getPlayerById(playerId) {
  return state.game.players.find((player) => player.playerId === playerId);
}

function getColorById(colorId) {
  return PLAYER_COLORS.find((color) => color.id === colorId) || PLAYER_COLORS[0];
}

function getDockChipColor(colorId) {
  const mutedMap = {
    red: "#b84a42",
    blue: "#3a69a8",
    yellow: "#9b8341",
    purple: "#6a4c8a",
    black: "#35353a",
    white: "#b8b3a8"
  };
  return mutedMap[colorId] || "#4f4f4f";
}

function getPlayerCreelTotals(player) {
  return player.creel.reduce(
    (acc, cardId) => {
      const card = getCard(cardId);
      if (!card) return acc;
      acc.might += Number(card.might || 0);
      acc.money += Number(card.price || 0);
      return acc;
    },
    { might: 0, money: 0 }
  );
}

function getEmptyCreelingSummary() {
  return {
    keep: { count: 0, might: 0, price: 0 },
    cull: { count: 0, might: 0, price: 0 },
    consume: { count: 0, might: 0, price: 0 }
  };
}

function getCard(cardId) {
  return state.catalogMap.get(cardId);
}

function shuffle(list) {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
