const STORAGE_KEY = "wl-fishing-state-v1";
const DATA_URL = "Expansions/Fishing_v5/fish-cards.json";
const CARD_BACK = "Expansions/Fishing_v5/back.jpg";
const HUNTING_CARD_BACK = "Expansions/Hunting_V5/Back.jpg";

const HUNTING_CARD_DEFS = [
  [1, "Prairie Dog", 1, 3, 5, 1, false, "$5"],
  [2, "Hare", 1, 4, 5, 1, false, "$5"],
  [3, "Beaver", 1, 4, 5, 1, false, "$5"],
  [4, "Raccoon", 1, 5, 5, 1, false, "$5"],
  [5, "Badger", 1, 5, 5, 1, false, "$5"],
  [6, "Porcupine", 1, 6, 5, 1, false, "$5"],
  [7, "Tarantula", 1, 4, 10, 1, false, "$10"],
  [8, "Desert Centipede", 1, 5, 10, 1, false, "$10"],
  [9, "Scorpion", 1, 5, 10, 1, false, "$10"],
  [10, "Gila Monster", 1, 6, 10, 1, false, "$10"],
  [11, "Snapping Turtle", 1, 6, 10, 1, false, "$10"],
  [12, "Rattlesnake", 1, 7, 10, 1, false, "$10"],
  [13, "Pronghorn", 2, 9, 15, 2, false, "$15"],
  [14, "Deer", 2, 10, 15, 2, false, "$15"],
  [15, "Bighorn Sheep", 2, 11, 15, 2, false, "$15"],
  [16, "Elk", 2, 12, 15, 2, false, "$15"],
  [17, "Fox", 2, 11, 20, 2, false, "$20"],
  [18, "Coyote", 2, 12, 20, 2, false, "$20"],
  [19, "Wolf", 2, 13, 20, 2, false, "$20"],
  [20, "Mountain Lion", 2, 14, 20, 2, false, "$20"],
  [21, "Bison", 3, 16, 25, 3, false, "$25"],
  [22, "Bison", 3, 18, 25, 3, false, "$25"],
  [23, "Black Bear", 3, 18, 30, 3, false, "$30"],
  [24, "Grizzly Bear", 3, 21, 30, 3, false, "$30"],
  [25, "Quail", 1, 3, 5, 1, false, "$5"],
  [26, "Crow", 1, 3, 5, 1, false, "$5"],
  [27, "Pheasant", 1, 4, 5, 1, false, "$5"],
  [28, "Mallard", 1, 4, 5, 1, false, "$5"],
  [29, "Turkey", 1, 5, 5, 1, false, "$5"],
  [30, "Great Horned Owl", 1, 5, 5, 1, false, "$5"],
  [31, "Red-tailed Hawk", 1, 6, 5, 1, false, "$5"],
  [32, "Golden Eagle", 1, 6, 5, 1, false, "$5"],
  [33, "Deer", 2, 17, 15, 2, true, "$15 + Legendary"],
  [34, "Bull Elk", 2, 19, 15, 2, true, "$15 + Legendary"],
  [35, "Fox", 2, 18, 20, 2, true, "$20 + Legendary"],
  [36, "Coyote", 2, 19, 20, 2, true, "$20 + Legendary"],
  [37, "Wolf", 2, 20, 20, 2, true, "$20 + Legendary"],
  [38, "Bison", 3, 25, 25, 3, true, "$25 + Legendary"],
  [39, "Black Bear", 3, 25, 30, 3, true, "$30 + Legendary"],
  [40, "Grizzly Bear", 3, 28, 50, 3, true, "$50 + Legendary"]
];

const HUNTING_CARDS = HUNTING_CARD_DEFS.map(([index, name, size, health, price, repercussions, isLegendary, reward]) => {
  const id = `H-${String(index).padStart(2, "0")}`;
  return {
    id,
    name,
    size,
    health,
    price,
    repercussions,
    isLegendary,
    reward,
    image: `Expansions/Hunting_V5/${id}.jpg`
  };
});

const HUNTING_EVENTS = Array.from({ length: 10 }, (_, index) => {
  const id = `H-${String(index + 41).padStart(2, "0")}`;
  return {
    id,
    name: `Event ${index + 1}`,
    image: `Expansions/Hunting_V5/${id}.jpg`
  };
});

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
  huntingCatalog: HUNTING_CARDS,
  huntingCatalogMap: new Map(HUNTING_CARDS.map((card) => [card.id, card])),
  huntingEvents: HUNTING_EVENTS,
  huntingEventMap: new Map(HUNTING_EVENTS.map((event) => [event.id, event])),
  runtime: {
    setupColors: ["red", "blue"],
    selectedPlayerId: null,
    reelingInProgress: false,
    playerPanelMode: "fish"
  },
  game: getDefaultGame()
};

function getDefaultGame() {
  return {
    version: 2,
    initialized: false,
    players: [],
    drawPile: [],
    discardPile: [],
    action: null,
    huntingDeck: [],
    huntingDiscard: [],
    huntingRemoved: [],
    huntingAction: null,
    lastMessage: "请先进入设置并生成公共牌堆。",
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
  dom.fishDrawCount = document.getElementById("fishDrawCount");
  dom.fishDiscardCount = document.getElementById("fishDiscardCount");
  dom.huntDrawCount = document.getElementById("huntDrawCount");
  dom.huntDiscardCount = document.getElementById("huntDiscardCount");
  dom.hubStatus = document.getElementById("hubStatus");
  dom.playerDock = document.getElementById("playerDock");
  dom.startHuntingBtn = document.getElementById("startHuntingBtn");
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

  dom.huntingOverlay = document.getElementById("huntingOverlay");
  dom.huntingFlowTitle = document.getElementById("huntingFlowTitle");
  dom.huntingContent = document.getElementById("huntingContent");
  dom.closeHuntingBtn = document.getElementById("closeHuntingBtn");
}

function bindBaseEvents() {
  dom.openSetupBtn.addEventListener("click", openSetup);
  dom.closeSetupBtn.addEventListener("click", closeSetup);
  dom.generateGameBtn.addEventListener("click", generateGameFromSetup);
  dom.resetStorageBtn.addEventListener("click", resetLocalGame);

  dom.closePlayerPanelBtn.addEventListener("click", closePlayerPanel);
  dom.discardSelectedBtn.addEventListener("click", discardSelectedFromPanel);
  dom.sellSelectedBtn.addEventListener("click", sellSelectedFromPanel);

  dom.startHuntingBtn.addEventListener("click", openHuntingFlow);
  dom.startFishingBtn.addEventListener("click", openFishingFlow);
  dom.closeFishingBtn.addEventListener("click", closeFishingFlow);
  dom.closeHuntingBtn.addEventListener("click", closeHuntingFlow);

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

  dom.huntingOverlay.addEventListener("click", (event) => {
    if (event.target === dom.huntingOverlay) {
      closeHuntingFlow();
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
    if (!parsed || !Array.isArray(parsed.drawPile) || !Array.isArray(parsed.players)) {
      state.game = getDefaultGame();
      return;
    }

    state.game = {
      ...getDefaultGame(),
      ...parsed,
      players: parsed.players.map((player) => ({
        ...player,
        creel: Array.isArray(player.creel) ? player.creel : [],
        huntingBag: Array.isArray(player.huntingBag) ? player.huntingBag : []
      })),
      drawPile: Array.isArray(parsed.drawPile) ? parsed.drawPile : [],
      discardPile: Array.isArray(parsed.discardPile) ? parsed.discardPile : [],
      huntingDeck: Array.isArray(parsed.huntingDeck) ? parsed.huntingDeck : [],
      huntingDiscard: Array.isArray(parsed.huntingDiscard) ? parsed.huntingDiscard : [],
      huntingRemoved: Array.isArray(parsed.huntingRemoved) ? parsed.huntingRemoved : []
    };

    state.game.version = 2;

    if (state.game.huntingDeck.length === 0) {
      state.game.huntingDeck = shuffle(getHuntingDeckSeedIds());
    }

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
      creel: [],
      huntingBag: []
    };
  });

  const ids = state.catalog.map((card) => card.id);
  state.game.drawPile = shuffle(ids);
  state.game.discardPile = [];
  state.game.action = null;
  state.game.huntingDeck = shuffle(getHuntingDeckSeedIds());
  state.game.huntingDiscard = [];
  state.game.huntingRemoved = [];
  state.game.huntingAction = null;
  state.game.initialized = true;
  setHubMessage(`钓鱼牌堆已生成，共 ${state.game.drawPile.length} 张；狩猎牌堆已生成，共 ${state.game.huntingDeck.length} 张。`);

  saveState();
  closeSetup();
  renderAll();
}

function resetLocalGame() {
  localStorage.removeItem(STORAGE_KEY);
  state.game = getDefaultGame();
  state.runtime.selectedPlayerId = null;
  state.runtime.reelingInProgress = false;
  state.runtime.playerPanelMode = "fish";
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

  if (!dom.huntingOverlay.classList.contains("hidden")) {
    renderHuntingFlow();
  }

  refreshLucideIcons();
}

function renderHub() {
  dom.fishDrawCount.textContent = String(state.game.drawPile.length);
  dom.fishDiscardCount.textContent = String(state.game.discardPile.length);
  dom.huntDrawCount.textContent = String(state.game.huntingDeck.length);
  dom.huntDiscardCount.textContent = String(state.game.huntingDiscard.length);
  dom.hubStatus.textContent = state.game.lastMessage;
  dom.startHuntingBtn.disabled = !state.game.initialized || state.game.players.length === 0;
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
    const huntingTotals = getPlayerHuntingTotals(player);
    const chip = document.createElement("button");
    chip.className = `player-chip ${DOCK_POSITIONS[index] || DOCK_POSITIONS[DOCK_POSITIONS.length - 1]}`;
    chip.style.background = chipColor;
    chip.style.color = color.text;
    chip.innerHTML = `<span class="chip-player-name">${player.name}</span><small class="chip-line"><span class="chip-line-item"><i data-lucide="fish" aria-hidden="true"></i>鱼篓 ${player.creel.length}/5</span><span class="chip-divider">|</span><span class="chip-line-item"><i data-lucide="scale" aria-hidden="true"></i>点数 ${totals.might}</span><span class="chip-divider">|</span><span class="chip-line-item"><i data-lucide="badge-dollar-sign" aria-hidden="true"></i>$${totals.money}</span></small><small class="chip-line"><span class="chip-line-item"><i data-lucide="paw-print" aria-hidden="true"></i>猎物 ${player.huntingBag.length}</span><span class="chip-divider">|</span><span class="chip-line-item"><i data-lucide="badge-dollar-sign" aria-hidden="true"></i>$${huntingTotals.value}/120</span></small>`;

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
  const huntingTotals = getPlayerHuntingTotals(player);
  dom.playerPanelTitle.textContent = `${player.name} - 鱼篓 ${player.creel.length}/5 | 猎物 ${player.huntingBag.length} ($${huntingTotals.value}/120)`;

  const modal = dom.playerOverlay.querySelector(".player-modal");
  modal.style.borderColor = color.hex;

  const mode = state.runtime.playerPanelMode;
  const inventory = mode === "hunting" ? player.huntingBag : player.creel;

  const switchHtml = `
    <div class="inventory-switch">
      <button class="ghost-btn inventory-btn ${mode === "fish" ? "active" : ""}" type="button" data-inventory-mode="fish"><i data-lucide="fish" aria-hidden="true"></i><span>鱼篓</span></button>
      <button class="ghost-btn inventory-btn ${mode === "hunting" ? "active" : ""}" type="button" data-inventory-mode="hunting"><i data-lucide="paw-print" aria-hidden="true"></i><span>猎物袋</span></button>
    </div>
  `;

  if (inventory.length === 0) {
    dom.playerPanelBody.innerHTML = `${switchHtml}<div class="notice">${mode === "hunting" ? "猎物袋为空。" : "鱼篓为空。"}</div>`;
    bindInventoryModeSwitch();
    dom.discardSelectedBtn.disabled = true;
    dom.sellSelectedBtn.disabled = true;
    return;
  }

  dom.playerPanelBody.innerHTML = `${switchHtml}${inventory
    .map((cardId) => renderPanelCard(cardId, "panel-check", mode))
    .join("")}`;

  bindInventoryModeSwitch();

  bindHighlightSelection(".panel-check", ".panel-card");

  dom.discardSelectedBtn.disabled = false;
  dom.sellSelectedBtn.disabled = false;
}

function bindInventoryModeSwitch() {
  dom.playerPanelBody.querySelectorAll("[data-inventory-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.runtime.playerPanelMode = button.dataset.inventoryMode;
      renderPlayerPanel();
      refreshLucideIcons();
    });
  });
}

function renderPanelCard(cardId, inputClassName, mode = "fish") {
  const card = mode === "hunting" ? getHuntingCard(cardId) : getCard(cardId);
  if (!card) return "";

  const detailText = mode === "hunting"
    ? `体型 ${card.size} | 生命 ${card.health} | 价格 $${card.price}`
    : `点数 ${card.might} | 价格 $${card.price}`;

  return `
    <label class="panel-card">
      <img src="${card.image}" alt="${card.name}" />
      <h3>${card.name}</h3>
      <p>${detailText}</p>
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

  if (state.runtime.playerPanelMode === "hunting") {
    player.huntingBag = player.huntingBag.filter((cardId) => !picked.includes(cardId));
    setHubMessage(`${player.name} 丢弃了 ${picked.length} 张猎物牌（返回牌盒）。`);
  } else {
    player.creel = player.creel.filter((cardId) => !picked.includes(cardId));
    picked.forEach((cardId) => moveCardToDiscard(cardId, "discard"));
    setHubMessage(`${player.name} 丢弃了 ${picked.length} 张鱼牌。`);
  }

  saveState();
  renderAll();
}

function sellSelectedFromPanel() {
  const picked = getCheckedValues(".panel-check");
  if (picked.length === 0) return;

  const player = getPlayerById(state.runtime.selectedPlayerId);
  if (!player) return;

  if (state.runtime.playerPanelMode === "hunting") {
    const total = picked.reduce((sum, cardId) => sum + (getHuntingCard(cardId)?.price || 0), 0);
    player.huntingBag = player.huntingBag.filter((cardId) => !picked.includes(cardId));
    setHubMessage(`${player.name} 在牧场出售 ${picked.length} 张猎物，结算 $${total}。`);
  } else {
    const total = picked.reduce((sum, cardId) => sum + (getCard(cardId)?.price || 0), 0);
    const payout = Math.floor(total / 10) * 10;
    player.creel = player.creel.filter((cardId) => !picked.includes(cardId));
    picked.forEach((cardId) => moveCardToDiscard(cardId, "sell"));
    setHubMessage(`${player.name} 在牧场出售 ${picked.length} 张鱼，结算 $${payout}。`);
  }

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

function openHuntingFlow() {
  if (!state.game.initialized || state.game.players.length === 0) {
    setHubMessage("请先完成设置。");
    renderHub();
    return;
  }

  if (!state.runtime.selectedPlayerId) {
    state.runtime.selectedPlayerId = state.game.players[0]?.playerId || null;
  }

  dom.huntingOverlay.classList.remove("hidden");
  renderHuntingFlow();
}

function closeHuntingFlow() {
  dom.huntingOverlay.classList.add("hidden");
}

function renderHuntingFlow() {
  const action = state.game.huntingAction;
  if (!action) {
    dom.huntingFlowTitle.textContent = "狩猎行动流";
    dom.huntingOverlay.querySelector(".hunting-modal").style.borderColor = "";
    renderHuntingTargetStep();
    return;
  }

  const player = getPlayerById(action.playerId);
  if (player) {
    const color = getColorById(player.colorId);
    dom.huntingFlowTitle.textContent = `狩猎行动流 - ${player.name}`;
    dom.huntingOverlay.querySelector(".hunting-modal").style.borderColor = color.hex;
  }

  if (action.step === "decision") {
    renderHuntingDecisionStep(action);
  } else if (action.step === "encounter") {
    renderHuntingEncounterStep(action);
  } else if (action.step === "overlimit") {
    renderHuntingOverlimitStep(action);
  }
}

function renderHuntingTargetStep() {
  const selectedPlayerId = state.runtime.selectedPlayerId || state.game.players[0]?.playerId;
  const playerButtons = state.game.players
    .map((player) => {
      const color = getColorById(player.colorId);
      const active = player.playerId === selectedPlayerId ? "active" : "";
      return `<button class="player-btn inventory-btn ${active}" data-hunter="${player.playerId}" style="background:${color.hex};color:${color.text}" type="button">${player.name}</button>`;
    })
    .join("");

  dom.huntingContent.innerHTML = `
    <section class="step-block">
      <h3>阶段 1：选择目标体型</h3>
      <p>先选择猎手，再选择本次狩猎目标体型。</p>
      <div class="player-options hunter-options">${playerButtons}</div>
      <div class="player-options hunt-size-options">
        <button class="launch-btn" data-hunt-size="1" type="button">体型 1 (小型)</button>
        <button class="launch-btn" data-hunt-size="2" type="button">体型 2 (中型)</button>
        <button class="launch-btn" data-hunt-size="3" type="button">体型 3 (大型)</button>
      </div>
    </section>
  `;

  dom.huntingContent.querySelectorAll("[data-hunter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.runtime.selectedPlayerId = button.dataset.hunter;
      renderHuntingTargetStep();
      refreshLucideIcons();
    });
  });

  dom.huntingContent.querySelectorAll("[data-hunt-size]").forEach((button) => {
    button.addEventListener("click", () => {
      startHuntingScout(Number(button.dataset.huntSize));
    });
  });
}

function startHuntingScout(targetSize) {
  const playerId = state.runtime.selectedPlayerId || state.game.players[0]?.playerId;
  const player = getPlayerById(playerId);
  if (!player) return;

  const scoutingDiscard = [];
  const skippedEventsToReturn = [];
  const eventLog = [];
  const eventHits = [];
  let firstEventApplied = false;
  let matchedCardId = null;

  while (!matchedCardId) {
    const cardId = drawOneHuntingCard();
    if (!cardId) break;

    const event = getHuntingEvent(cardId);
    if (event) {
      if (!firstEventApplied) {
        firstEventApplied = true;
        state.game.huntingRemoved.push(cardId);
        eventHits.push({ id: cardId, handling: "triggered-removed" });
        eventLog.push(`${event.name} 已触发并移出本局牌堆（具体效果请在线下结算）`);
      } else {
        skippedEventsToReturn.push(cardId);
        eventHits.push({ id: cardId, handling: "skipped-returned" });
        eventLog.push(`${event.name} 本次已跳过，稍后洗回公共牌堆`);
      }
      continue;
    }

    const card = getHuntingCard(cardId);
    if (card && card.size === targetSize) {
      matchedCardId = cardId;
      break;
    }
    scoutingDiscard.push(cardId);
  }

  state.game.huntingDiscard.push(...scoutingDiscard);

  if (skippedEventsToReturn.length > 0) {
    state.game.huntingDeck = shuffle([...state.game.huntingDeck, ...skippedEventsToReturn]);
  }

  if (!matchedCardId) {
    setHubMessage("狩猎牌堆中未找到符合体型的猎物，本次狩猎结束。");
    saveState();
    renderAll();
    return;
  }

  state.game.huntingAction = {
    playerId,
    step: "decision",
    targetSize,
    matchedCardId,
    baseAttack: 0,
    useRifle: false,
    rifleBonus: 0,
    useShotgun: false,
    shotgunBonus: 0,
    eventLog,
    eventHits
  };

  const eventText = eventLog.length > 0 ? ` 事件：${eventLog.join("；")}` : "";
  setHubMessage(`${player.name} 已发现目标猎物，准备决策。${eventText}`);
  saveState();
  renderAll();
}

function renderHuntingDecisionStep(action) {
  const card = getHuntingCard(action.matchedCardId);
  if (!card) {
    state.game.huntingAction = null;
    saveState();
    renderAll();
    return;
  }

  const eventToggleHtml = action.eventHits?.length
    ? `
      <div class="event-section">
        <p class="notice">本次抽到事件牌（${action.eventHits.length}）</p>
        <div id="eventCardsPanel" class="event-cards-grid">
          ${action.eventHits.map((entry) => renderHuntingEventCard(entry.id, entry.handling)).join("")}
        </div>
      </div>
    `
    : "";

  dom.huntingContent.innerHTML = `
    <section class="step-block">
      <h3>阶段 2：自动搜寻结果</h3>
      <p>目标体型 ${action.targetSize}，已锁定猎物：</p>
      ${eventToggleHtml}
      ${renderHuntingCardPreview(card)}
      <div class="modal-actions">
        <button id="avoidHuntBtn" class="ghost-btn" type="button"><i data-lucide="wind" aria-hidden="true"></i><span>避开</span></button>
        <button id="encounterHuntBtn" class="launch-btn" type="button"><i data-lucide="swords" aria-hidden="true"></i><span>遭遇</span></button>
      </div>
    </section>
  `;

  document.getElementById("avoidHuntBtn").addEventListener("click", () => {
    state.game.huntingDiscard.push(card.id);
    finishHuntingAction(action.playerId, `已避开 ${card.name}，猎物已弃置。`);
  });

  document.getElementById("encounterHuntBtn").addEventListener("click", () => {
    action.step = "encounter";
    saveState();
    renderAll();
  });
}

function renderHuntingEncounterStep(action) {
  const card = getHuntingCard(action.matchedCardId);
  if (!card) {
    state.game.huntingAction = null;
    saveState();
    renderAll();
    return;
  }

  const rifleBonus = action.useRifle ? Number(action.rifleBonus || 0) : 0;
  const shotgunBonus = action.useShotgun ? Number(action.shotgunBonus || 0) : 0;
  const baseAttack = Number(action.baseAttack || 0);
  const finalAttack = baseAttack + rifleBonus + shotgunBonus;
  const success = finalAttack >= card.health;
  const rifleOptions = Array.from({ length: card.size + 1 }, (_, idx) => idx)
    .map((value) => `<button class="modifier-chip ${rifleBonus === value ? "active" : ""}" type="button" data-rifle-value="${value}" ${action.useRifle ? "" : "disabled"}>+${value}</button>`)
    .join("");
  const shotgunOptions = [
    { value: 1, label: "+1" },
    { value: 0, label: "0" },
    { value: -1, label: "-1" }
  ]
    .map((option) => `<button class="modifier-chip ${shotgunBonus === option.value ? "active" : ""}" type="button" data-shotgun-value="${option.value}" ${action.useShotgun ? "" : "disabled"}>${option.label}</button>`)
    .join("");

  dom.huntingContent.innerHTML = `
    <section class="step-block">
      <h3>阶段 3：战斗计算器</h3>
      ${renderHuntingCardPreview(card)}
      <div class="combat-grid">
        <div class="combat-row weapon-block">
          <label>基础攻击力（打出的扑克牌总点数）</label>
          <div class="modifier-chip-row">
            <button class="modifier-chip" type="button" data-attack-delta="-5">-5</button>
            <button class="modifier-chip" type="button" data-attack-delta="-1">-1</button>
            <button class="modifier-chip" type="button" data-attack-delta="1">+1</button>
            <button class="modifier-chip" type="button" data-attack-delta="5">+5</button>
          </div>
          <p class="notice">基础攻击力：${baseAttack}</p>
        </div>
        <div class="combat-row weapon-block">
          <button id="useRifleBtn" class="ghost-btn modifier-toggle ${action.useRifle ? "active" : ""}" type="button"><i data-lucide="crosshair" aria-hidden="true"></i><span>使用步枪 (Rifle)</span></button>
          <div class="modifier-chip-row">${rifleOptions}</div>
          <p class="notice">步枪加成：${rifleBonus}</p>
        </div>
        <div class="combat-row weapon-block">
          <button id="useShotgunBtn" class="ghost-btn modifier-toggle ${action.useShotgun ? "active" : ""}" type="button"><i data-lucide="bomb" aria-hidden="true"></i><span>使用霰弹枪 (Shotgun)</span></button>
          <div class="modifier-chip-row">${shotgunOptions}</div>
          <p class="notice">霰弹枪修正：${shotgunBonus >= 0 ? `+${shotgunBonus}` : shotgunBonus}</p>
        </div>
      </div>
      <p class="notice">最终攻击值：<strong>${finalAttack}</strong>，目标生命：<strong>${card.health}</strong>，当前判定：<strong>${success ? "可击杀" : "攻击不足"}</strong></p>
      <div class="modal-actions">
        <button id="resolveHuntBtn" class="launch-btn" type="button"><i data-lucide="crosshair" aria-hidden="true"></i><span>开火结算</span></button>
      </div>
    </section>
  `;

  dom.huntingContent.querySelectorAll("[data-attack-delta]").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.attackDelta || 0);
      action.baseAttack = Math.max(0, Number(action.baseAttack || 0) + delta);
      saveState();
      renderHuntingFlow();
    });
  });

  document.getElementById("useRifleBtn").addEventListener("click", () => {
    action.useRifle = !action.useRifle;
    if (!action.useRifle) action.rifleBonus = 0;
    saveState();
    renderHuntingFlow();
  });

  document.getElementById("useShotgunBtn").addEventListener("click", () => {
    action.useShotgun = !action.useShotgun;
    if (!action.useShotgun) action.shotgunBonus = 0;
    saveState();
    renderHuntingFlow();
  });

  dom.huntingContent.querySelectorAll("[data-rifle-value]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!action.useRifle) return;
      action.rifleBonus = Number(button.dataset.rifleValue || 0);
      saveState();
      renderHuntingFlow();
    });
  });

  dom.huntingContent.querySelectorAll("[data-shotgun-value]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!action.useShotgun) return;
      action.shotgunBonus = Number(button.dataset.shotgunValue || 0);
      saveState();
      renderHuntingFlow();
    });
  });

  document.getElementById("resolveHuntBtn").addEventListener("click", () => resolveHuntingEncounter(action));
}

function resolveHuntingEncounter(action) {
  const player = getPlayerById(action.playerId);
  const card = getHuntingCard(action.matchedCardId);
  if (!player || !card) return;

  const baseAttack = Number(action.baseAttack || 0);
  const rifleBonus = action.useRifle ? Number(action.rifleBonus || 0) : 0;
  const shotgunBonus = action.useShotgun ? Number(action.shotgunBonus || 0) : 0;
  const finalAttack = baseAttack + rifleBonus + shotgunBonus;

  if (finalAttack < card.health) {
    state.game.huntingDiscard.push(card.id);
    finishHuntingAction(player.playerId, "攻击力不足，狩猎失败，猎物已弃置。\n（事件和额外效果请按实体版规则结算）");
    return;
  }

  const repercussion = Math.min(finalAttack - card.health, card.repercussions);
  player.huntingBag.push(card.id);

  if (getPlayerHuntingTotals(player).value > 120) {
    action.step = "overlimit";
    setHubMessage(`狩猎成功！获得奖励：${card.reward}。反噬次数：${repercussion}（请在线下结算）。超过 $120 上限，请先丢弃猎物。`);
    saveState();
    renderAll();
    return;
  }

  finishHuntingAction(player.playerId, `狩猎成功！获得奖励：${card.reward}。反噬次数：${repercussion}（请在线下结算）。`);
}

function renderHuntingOverlimitStep(action) {
  const player = getPlayerById(action.playerId);
  if (!player) return;

  const cardsHtml = player.huntingBag
    .map((cardId) => renderPanelCard(cardId, "hunting-limit-check", "hunting"))
    .join("");

  dom.huntingContent.innerHTML = `
    <section class="step-block">
      <h3>阶段 4：入包上限处理</h3>
      <p class="notice warn">猎物总价值超过 $120。请勾选要丢弃的猎物，直到总价值不超过 $120。</p>
      <p id="huntingLimitHint" class="notice"></p>
      <div class="creeling-scroll-list">${cardsHtml}</div>
      <div class="modal-actions">
        <button id="confirmHuntingTrimBtn" class="launch-btn" type="button">确认丢弃并结束狩猎</button>
      </div>
    </section>
  `;

  bindHighlightSelection(".hunting-limit-check", ".panel-card");

  const hintEl = document.getElementById("huntingLimitHint");
  const confirmBtn = document.getElementById("confirmHuntingTrimBtn");

  const sync = () => {
    const selected = getCheckedValues(".hunting-limit-check");
    const selectedValue = selected.reduce((sum, cardId) => sum + (getHuntingCard(cardId)?.price || 0), 0);
    const currentValue = getPlayerHuntingTotals(player).value;
    const afterValue = currentValue - selectedValue;
    hintEl.textContent = `当前 $${currentValue} / 120，已选丢弃价值 $${selectedValue}，丢弃后 $${afterValue}`;
    confirmBtn.disabled = afterValue > 120;
  };

  dom.huntingContent.querySelectorAll(".hunting-limit-check").forEach((input) => {
    input.addEventListener("change", sync);
  });

  sync();

  confirmBtn.addEventListener("click", () => {
    const selected = getCheckedValues(".hunting-limit-check");
    const selectedSet = new Set(selected);
    const afterValue = player.huntingBag
      .filter((cardId) => !selectedSet.has(cardId))
      .reduce((sum, cardId) => sum + (getHuntingCard(cardId)?.price || 0), 0);

    if (afterValue > 120) {
      setHubMessage("仍超过 $120 上限，请继续选择要丢弃的猎物。");
      renderHub();
      return;
    }

    player.huntingBag = player.huntingBag.filter((cardId) => !selectedSet.has(cardId));
    finishHuntingAction(player.playerId, `已完成上限处理，当前猎物总价值 $${afterValue}。`);
  });
}

function finishHuntingAction(playerId, message) {
  const player = getPlayerById(playerId);

  if (state.game.huntingDiscard.length > 0) {
    state.game.huntingDeck = shuffle([...state.game.huntingDeck, ...state.game.huntingDiscard]);
    state.game.huntingDiscard = [];
  }

  state.game.huntingAction = null;
  setHubMessage(`${player?.name || "玩家"}：${message}`);
  saveState();
  renderAll();
}

function renderHuntingCardPreview(card) {
  return `
    <article class="panel-card hunting-card-choice">
      <img src="${card.image}" alt="${card.name}" />
      <h3>${card.name}${card.isLegendary ? " (Legendary)" : ""}</h3>
      <p>体型 ${card.size} | 生命 ${card.health} | 价格 $${card.price} | 反噬上限 ${card.repercussions}</p>
      <p>奖励：${card.reward}</p>
    </article>
  `;
}

function renderHuntingEventCard(eventCardId, handling) {
  const event = getHuntingEvent(eventCardId);
  if (!event) return "";

  const handlingText = handling === "triggered-removed"
    ? "已触发并移出本局"
    : handling === "skipped-returned"
      ? "本次已跳过，已洗回公共牌堆"
      : "后续事件，已弃置";

  return `
    <article class="panel-card event-card">
      <img src="${event.image}" alt="${event.name}" />
      <h3>${event.name}</h3>
      <p>${handlingText}</p>
    </article>
  `;
}

function renderFishingFlow() {
  const action = state.game.action;
  if (!action) {
    dom.fishingOverlay.querySelector(".fishing-modal").style.borderColor = "";
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
  dom.fishingOverlay.querySelector(".fishing-modal").style.borderColor = "";

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
      <article class="panel-card steeling-fish-card">
        <p class="notice">弃掉鱼篓中的鱼，每张 +1 点，且会进入公共弃牌堆。</p>
        <div class="creel-choice-grid">${options || "<div class=\"notice\">鱼篓为空，无法用弃鱼加成。</div>"}</div>
      </article>
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

  pokerRowEl.querySelectorAll(".poker-rank").forEach((select) => {
    select.addEventListener("change", updatePokerSummary);
  });

  dom.fishingContent.querySelectorAll("[data-suit-option]").forEach((chip) => {
    chip.addEventListener("click", () => {
      syncSuitIconSelection(chip.dataset.suitOption);
      updatePokerSummary();
    });
  });

  bindHighlightSelection(".steeling-fish", ".creel-choice");

  updatePokerSummary();
  syncSuitIconSelection(selectedSuit);

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
    { id: "spades", label: "黑桃", icon: "spade" },
    { id: "clubs", label: "梅花", icon: "club" },
    { id: "hearts", label: "红桃", icon: "heart" },
    { id: "diamonds", label: "方块", icon: "diamond" }
  ];

  const rankOptions = ranks
    .map((rank) => {
      const label = rank || "请选择点数";
      const selected = rank === selectedRank ? "selected" : "";
      return `<option value="${rank}" ${selected}>${label}</option>`;
    })
    .join("");

  const suitChips = suits
    .map((suit) => {
      const active = suit.id === selectedSuit ? "active" : "";
      return `<button class="suit-icon-chip ${active}" type="button" data-suit-option="${suit.id}"><i data-lucide="${suit.icon}" aria-hidden="true"></i>${suit.label}</button>`;
    })
    .join("");

  return `
    <div id="singlePokerRow" class="poker-card-row">
      <select class="poker-rank">${rankOptions}</select>
      <div class="suit-icon-row">${suitChips}</div>
    </div>
  `;
}

function syncSuitIconSelection(selectedSuit) {
  document.querySelectorAll(".suit-icon-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.suitOption === selectedSuit);
  });
}

function parseSinglePokerCard(container) {
  const rank = container.querySelector(".poker-rank")?.value || "";
  const suit =
    document.querySelector(".suit-icon-chip.active")?.dataset.suitOption ||
    container.querySelector(".suit-icon-chip.active")?.dataset.suitOption ||
    "spades";
  const value = getPokerRankValue(rank);

  return {
    rank,
    suit,
    value
  };
}

function getPokerRankValue(rank) {
  if (rank === "A") return 11;
  if (rank === "K" || rank === "Q" || rank === "J") return 10;
  const numeric = Number(rank);
  return Number.isFinite(numeric) ? numeric : 0;
}

function renderReelingStep(action) {
  const cards = action.drawnIds
    .map((cardId) => renderFlipCard(cardId))
    .join("");

  dom.fishingContent.innerHTML = `
    <section class="step-block">
      <h3>Step 3: 收线 (Reeling)</h3>
      <p>目标点数：<strong>${action.targetEffort}</strong> | 当前累计：<strong>${action.reelTotal}</strong></p>
      <article class="panel-card reeling-board-card">
        <p class="notice">逐张翻牌直到点数达到或超过目标。若超出，最后一张将被弃置。</p>
        <div class="reveal-row">${cards || "<div class=\"notice\">点击下方按钮开始收线。</div>"}</div>
      </article>
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
  const suitMetaMap = {
    spades: { label: "黑桃", icon: "spade" },
    clubs: { label: "梅花", icon: "club" },
    hearts: { label: "红桃", icon: "heart" },
    diamonds: { label: "方块", icon: "diamond" }
  };
  const suitMeta = suitMetaMap[action.discardedPokerCard?.suit] || { label: "未知花色", icon: null };

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
      <p class="notice">可上下滚动查看所有待结算鱼牌，并逐条处理。（花色：<span class="suit-hint">${suitMeta.icon ? `<i data-lucide="${suitMeta.icon}" aria-hidden="true"></i>` : ""}${suitMeta.label}</span>）</p>
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

function drawOneHuntingCard() {
  if (state.game.huntingDeck.length === 0 && state.game.huntingDiscard.length > 0) {
    state.game.huntingDeck = shuffle([...state.game.huntingDiscard]);
    state.game.huntingDiscard = [];
  }

  if (state.game.huntingDeck.length === 0) {
    return null;
  }

  return state.game.huntingDeck.pop();
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

function getPlayerHuntingTotals(player) {
  return player.huntingBag.reduce(
    (acc, cardId) => {
      const card = getHuntingCard(cardId);
      if (!card) return acc;
      acc.value += Number(card.price || 0);
      return acc;
    },
    { value: 0 }
  );
}

function bindHighlightSelection(inputSelector, containerSelector) {
  const inputs = Array.from(document.querySelectorAll(inputSelector));
  inputs.forEach((input) => {
    const container = input.closest(containerSelector);
    if (!container) return;

    const sync = () => {
      container.classList.toggle("selected", Boolean(input.checked));
    };

    input.addEventListener("change", sync);
    sync();
  });
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

function getHuntingCard(cardId) {
  return state.huntingCatalogMap.get(cardId);
}

function getHuntingEvent(cardId) {
  return state.huntingEventMap.get(cardId);
}

function getHuntingDeckSeedIds() {
  return [...state.huntingCatalog.map((card) => card.id), ...state.huntingEvents.map((event) => event.id)];
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

function refreshLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}
