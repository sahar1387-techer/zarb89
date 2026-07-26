let score = 0;
let total = 0;
let num1 = 0;
let num2 = 0;
let answer = 0;

const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submitBtn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const newGameBtn = document.getElementById('newGameBtn');

function generateQuestion() {
    // عدد 8 یا 9 رو تصادفی انتخاب کن
    const base = Math.random() < 0.5 ? 8 : 9;
    num1 = base;
    num2 = Math.floor(Math.random() * 9) + 1; // 1 تا 9
    answer = num1 * num2;
    
    questionEl.textContent = `${num1} × ${num2} = ?`;
    answerInput.value = '';
    answerInput.focus();
    resultEl.textContent = '';
    resultEl.className = 'result';
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer) || userAnswer === '') {
        resultEl.textContent = '❗ لطفاً یک عدد وارد کنید!';
        resultEl.className = 'result wrong';
        return;
    }
    
    total++;
    totalEl.textContent = total;
    
    if (userAnswer === answer) {
        score++;
        scoreEl.textContent = score;
        resultEl.textContent = `✅ درسته! ${num1} × ${num2} = ${answer} 👏`;
        resultEl.className = 'result correct';
        // انیمیشن کوچک
        questionEl.style.transform = 'scale(1.1)';
        setTimeout(() => {
            questionEl.style.transform = 'scale(1)';
        }, 300);
    } else {
        resultEl.textContent = `❌ نه! ${num1} × ${num2} = ${answer} بود. دوباره تلاش کن!`;
        resultEl.className = 'result wrong';
    }
    
    setTimeout(generateQuestion, 1500);
}

function newGame() {
    score = 0;
    total = 0;
    scoreEl.textContent = score;
    totalEl.textContent = total;
    resultEl.textContent = '';
    resultEl.className = 'result';
    generateQuestion();
}

// رویدادها
submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
newGameBtn.addEventListener('click', newGame);

// شروع بازی
newGame();