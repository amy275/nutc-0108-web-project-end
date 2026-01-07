// 1️⃣ DOM 元素
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const foodName = document.getElementById("foodName");
const restartBtn = document.getElementById("restartBtn");

// 統計
const foodTableBody = document.querySelector("#foodTable tbody");
const ctx = document.getElementById('foodChart').getContext('2d');
let pieChart;

// 2️⃣ 題目資料
const questions = [
  { text: "今天想吃什麼？", options: ["正餐 🍛", "輕食 🥪"] },
  { text: "偏好的口味？", options: ["重口味 🌶️", "清淡 🥗", "甜 🍰"] },
  { text: "現在趕時間嗎？", options: ["很趕 ⏰", "不趕 🛋️"] },
  { text: "喜歡的風格？", options: ["台式 🥟", "日式 🍣", "西式 🍔"] },
  { text: "預算大概多少？", options: ["$ 💰", "$$ 💵", "$$$ 💎"] }
];

// 3️⃣ 標籤對應表
const answerTagMap = [
  { "正餐 🍛": "meal", "輕食 🥪": "light" },
  { "重口味 🌶️": "strong", "清淡 🥗": "lightTaste", "甜食 🍰": "sweet" },
  { "很趕 ⏰": "fast", "不趕 🛋️": "relax" },
  { "台式 🥟": "taiwan", "日式 🍣": "japanese", "西式 🍔": "western" },
  { "$ 💰": "cheap", "$$ 💵": "mid", "$$$ 💎": "high" }
];

// 4️⃣ 食物資料
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
  { name: "鬆餅 🥞", tags: ["light", "sweet", "relax", "japense", "mid"] },
  { name: "手搖飲 🧋", tags: ["light", "sweet", "fast", "taiwan", "cheap"] }
];

// 5️⃣ 狀態
let currentQuestion = 0;
let userTags = [];

// 6️⃣ 統計初始化
let foodStats = {};
foodList.forEach(food => foodStats[food.name] = 0);

// 7️⃣ 顯示題目
function showQuestion() {
  questionEl.textContent = questions[currentQuestion].text;
  optionsEl.innerHTML = "";

  questions[currentQuestion].options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsEl.appendChild(btn);
  });
}

// 8️⃣ 選擇答案
function selectAnswer(answer) {
  userTags[currentQuestion] = answerTagMap[currentQuestion][answer];

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
}

// 9️⃣ 找最匹配食物
function findMatchingFood() {
  const exactMatch = foodList.find(food =>
    food.tags.every(tag => userTags.includes(tag))
  );
  if (exactMatch) return exactMatch;

  // 找最相似
  let maxMatch = -1, closestFood = null;
  foodList.forEach(food => {
    const matchCount = food.tags.filter(tag => userTags.includes(tag)).length;
    if (matchCount > maxMatch) {
      maxMatch = matchCount;
      closestFood = food;
    }
  });
  return closestFood;
}

// 🔟 顯示結果
function showResult() {
  quiz.style.display = "none";
  result.style.display = "block";

  const matchedFood = findMatchingFood();
  foodName.textContent = `推薦你吃：${matchedFood.name}`;

  // 更新統計
  foodStats[matchedFood.name] += 1;
  updateTable();
  updateChart();
}

// 1️⃣1️⃣ 更新表格
function updateTable() {
  foodTableBody.innerHTML = "";
  for (let food in foodStats) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${food}</td><td>${foodStats[food]}</td>`;
    foodTableBody.appendChild(tr);
  }
}

// 1️⃣2️⃣ 更新圓餅圖
function updateChart() {
  const labels = Object.keys(foodStats);
  const data = Object.values(foodStats);
  const bgColors = ['#FFB84D', '#FFA64D', '#FF9933', '#FF8000', '#FF6600'];

  if (pieChart) {
    pieChart.data.datasets[0].data = data;
    pieChart.update();
  } else {
    pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '食物推薦統計',
          data: data,
          backgroundColor: bgColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

// 1️⃣3️⃣ 再測一次
restartBtn.onclick = () => {
  currentQuestion = 0;
  userTags = [];
  quiz.style.display = "block";
  result.style.display = "none";
  showQuestion();
}

// 1️⃣4️⃣ 啟動第一題
showQuestion();
