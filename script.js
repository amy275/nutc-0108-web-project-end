// 1️⃣ 抓 DOM 元素
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const foodName = document.getElementById("foodName");
const restartBtn = document.getElementById("restartBtn");

// 2️⃣ 題目資料
const questions = [
  { text: "今天想吃什麼？", options: ["正餐", "輕食"] },
  { text: "偏好的口味？", options: ["重口味", "清淡", "甜"] },
  { text: "現在趕時間嗎？", options: ["很趕", "不趕"] },
  { text: "喜歡的風格？", options: ["台式", "日式", "西式"] },
  { text: "預算大概多少？", options: ["$", "$$", "$$$"] }
];

// 3️⃣ 標籤對應表
const answerTagMap = [
  { "正餐": "meal", "輕食": "light" },
  { "重口味": "strong", "清淡": "lightTaste", "甜": "sweet" },
  { "很趕": "fast", "不趕": "relax" },
  { "台式": "taiwan", "日式": "japanese", "西式": "western" },
  { "$": "cheap", "$$": "mid", "$$$": "high" }
];

// 4️⃣ 食物資料，每個食物都有 5 個標籤
const foodList = [
  { name: "雞排", tags: ["meal", "strong", "fast", "taiwan", "cheap"] },
  { name: "拉麵", tags: ["meal", "strong", "relax", "japanese", "mid"] },
  { name: "壽司", tags: ["light", "lightTaste", "relax", "japanese", "mid"] },
  { name: "漢堡", tags: ["meal", "strong", "fast", "western", "mid"] },
  { name: "甜點", tags: ["light", "sweet", "relax", "western", "cheap"] }
];

// 5️⃣ 狀態變數
let currentQuestion = 0;
let userTags = [];

// 6️⃣ 顯示題目
function showQuestion() {
  questionEl.textContent = questions[currentQuestion].text;
  optionsEl.innerHTML = "";

  questions[currentQuestion].options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option); // 選完直接跳下一題
    optionsEl.appendChild(btn);
  });
}

// 7️⃣ 選擇答案
function selectAnswer(answer) {
  userTags[currentQuestion] = answerTagMap[currentQuestion][answer];

  // 自動跳下一題
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
}

// 8️⃣ 找完全匹配的食物
function findMatchingFood() {
  const exactMatch = foodList.find(food =>
    food.tags.every(tag => userTags.includes(tag))
  );
  if (exactMatch) return exactMatch;

  // 沒有完全符合 → 找最相似
  let maxMatch = -1;
  let closestFood = null;

  foodList.forEach(food => {
    const matchCount = food.tags.filter(tag => userTags.includes(tag)).length;
    if (matchCount > maxMatch) {
      maxMatch = matchCount;
      closestFood = food;
    }
  });

  return closestFood;
}

// 9️⃣ 顯示結果
function showResult() {
  quiz.style.display = "none";
  result.style.display = "block";

  const matchedFood = findMatchingFood();
  foodName.textContent = `推薦你吃：${matchedFood.name}`;

  console.log("使用者標籤：", userTags);
  console.log("推薦食物標籤：", matchedFood.tags);
}

// 🔟 再測一次功能
restartBtn.onclick = () => {
  currentQuestion = 0;
  userTags = [];
  quiz.style.display = "block";
  result.style.display = "none";
  showQuestion();
};

// 1️⃣1️⃣ 啟動第一題
showQuestion();
