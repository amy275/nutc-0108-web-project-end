let selectedAnswer = null;
// 1. 抓 DOM 元素
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const foodName = document.getElementById("foodName");

// 2. 題目資料
const questions = [
  {
    text: "今天想吃的分量？",
    options: ["吃很飽", "剛剛好", "吃一點"]
  },
  {
    text: "偏好的口味？",
    options: ["重口味", "清淡", "甜甜的"]
  },
  {
    text: "現在的狀態？",
    options: ["趕時間", "悠閒", "想療癒"]
  },
  {
    text: "喜歡的風格？",
    options: ["台式", "日式", "西式"]
  },
  {
    text: "可接受的價位？",
    options: ["$", "$$", "$$$"]
  }
];

// 3. 狀態
let currentQuestion = 0;
let answers = [];

// 4. 顯示題目
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

// 5. 記錄答案
function selectAnswer(answer) {
  answers[currentQuestion] = answer;
  selectedAnswer = answer;

  // Q1 分量
  if (currentQuestion === 0) {
    if (answer === "吃很飽") {
      foods["雞排"] += 2;
      foods["拉麵"] += 2;
    }
    if (answer === "吃一點") {
      foods["甜點"] += 2;
    }
  }

  // Q2 口味
  if (currentQuestion === 1) {
    if (answer === "重口味") foods["雞排"] += 2;
    if (answer === "清淡") foods["壽司"] += 2;
    if (answer === "甜甜的") foods["甜點"] += 2;
  }

  // Q4 風格（示範）
  if (currentQuestion === 3) {
    if (answer === "日式") foods["拉麵"] += 1;
    if (answer === "日式") foods["壽司"] += 1;
  }
}


// 6. 下一題
nextBtn.onclick = () => {
  if (!selectedAnswer) {
    alert("請先選擇一個選項！");
    return;
  }

  selectedAnswer = null;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
};

// 7. 顯示結果
function showResult() {
  quiz.style.display = "none";
  result.style.display = "block";

  let maxScore = -1;
  let finalFood = "";

  for (let food in foods) {
    if (foods[food] > maxScore) {
      maxScore = foods[food];
      finalFood = food;
    }
  }

  foodName.textContent = `推薦你吃：${finalFood}`;
  console.log("使用者答案：", answers);
  console.log("食物分數：", foods);
}


// 8.食物資料
const foods = {
  雞排: 0,
  拉麵: 0,
  壽司: 0,
  甜點: 0
};

// 9. ⭐ 啟動第一題（最重要的一行）
showQuestion();
