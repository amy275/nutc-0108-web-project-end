// ===== 題目設定 =====
const questions = [
  {
    text: "你想吃正餐還是輕食？",
    options: ["正餐 🍛", "輕食 🥪"]
  },
  {
    text: "偏好的口味？",
    options: ["重口味 🌶️", "清淡 🥗", "甜 🍰"]
  },
  {
    text: "現在趕時間嗎？",
    options: ["趕時間 ⏱️", "不趕時間 ☕"]
  },
  {
    text: "想吃哪種風格？",
    options: ["台式 🇹🇼", "日式 🇯🇵", "西式 🇺🇸"]
  },
  {
    text: "預算範圍？",
    options: ["便宜 💰", "中等 💵", "偏高 💎"]
  }
];

// ===== 選項 → 標籤對照 =====
const answerTagMap = {
  "正餐 🍛": "meal",
  "輕食 🥪": "light",

  "重口味 🌶️": "strong",
  "清淡 🥗": "lightTaste",
  "甜 🍰": "sweet",

  "趕時間 ⏱️": "fast",
  "不趕時間 ☕": "relax",

  "台式 🇹🇼": "taiwan",
  "日式 🇯🇵": "japanese",
  "西式 🇺🇸": "western",

  "便宜 💰": "cheap",
  "中等 💵": "mid",
  "偏高 💎": "expensive"
};

// ===== 食物資料（每個食物 5 個標籤）=====
const foodList = [
  { name: "雞排 🍗", tags: ["light", "strong", "fast", "taiwan", "cheap"] },
  { name: "鐵板燒 🔪", tags: ["meal", "strong", "relax", "taiwan", "high"] },
  { name: "火鍋 🍲", tags: ["meal", "strong", "relax", "taiwan", "mid"] },
  { name: "拉麵 🍜", tags: ["meal", "strong", "relax", "japanese", "mid"] },
  { name: "牛排 🥩", tags: ["meal", "strong", "relax", "western", "high"] },
  { name: "壽司 🍣", tags: ["light", "lightTaste", "relax", "japanese", "mid"] },
  { name: "漢堡 🍔", tags: ["meal", "strong", "fast", "western", "mid"] },
  { name: "義大利麵 🍝", tags: ["meal", "strong", "relax", "western", "mid"] },
  { name: "蛋糕 🍰", tags: ["light", "sweet", "relax", "western", "cheap"] },
  { name: "豆花 🥣", tags: ["light", "sweet", "fast", "taiwan", "cheap"] },
  { name: "剉冰 🍨", tags: ["light", "sweet", "fast", "taiwan", "mid"] },
  { name: "鬆餅 🥞", tags: ["light", "sweet", "relax", "japanese", "mid"] },
  { name: "手搖飲 🧋", tags: ["light", "sweet", "fast", "taiwan", "cheap"] }
];

// ===== 狀態變數 =====
let currentQuestion = 0;
let userTags = [];
let resultCount = {};
let chartInstance = null;

// ===== DOM =====
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const resultDiv = document.getElementById("result");
const foodName = document.getElementById("food-name");
const retryBtn = document.getElementById("retry");

// ===== 初始化 =====
showQuestion();

// ===== 顯示題目 =====
function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectOption(option);
    optionsDiv.appendChild(btn);
  });
}

// ===== 點選選項 =====
function selectOption(option) {
  const tag = answerTagMap[option];
  if (tag) userTags.push(tag);

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===== 顯示結果 =====
function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultDiv.style.display = "block";

  let bestMatch = null;
  let bestScore = -1;

  foods.forEach(food => {
    const score = food.tags.filter(tag => userTags.includes(tag)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = food;
    }
  });

  if (!bestMatch) {
    foodName.textContent = "目前沒有合適的推薦 🤔";
    return;
  }

  foodName.textContent = bestMatch.name;

  // 統計結果
  resultCount[bestMatch.name] = (resultCount[bestMatch.name] || 0) + 1;
  updateChart();
}

// ===== 再測一次 =====
retryBtn.onclick = () => {
  currentQuestion = 0;
  userTags = [];
  document.getElementById("quiz").style.display = "block";
  resultDiv.style.display = "none";
  showQuestion();
};

// ===== 更新圓餅圖 =====
function updateChart() {
  const ctx = document.getElementById("resultChart");

  const labels = Object.keys(resultCount);
  const data = Object.values(resultCount);

  const bgColors = labels.map((_, i) =>
    `hsl(${(i * 360) / labels.length}, 70%, 65%)`
  );

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: bgColors
      }]
    }
  });
}
