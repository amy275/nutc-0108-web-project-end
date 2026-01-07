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
}

// 6. 下一題
nextBtn.onclick = () => {
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
  foodName.textContent = "推薦你吃：雞排 🍗";
  console.log(answers);
}

// 8. ⭐ 啟動第一題（最重要的一行）
showQuestion();
