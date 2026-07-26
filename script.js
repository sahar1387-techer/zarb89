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

// ======== صداها ========
function playSound(type) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'correct') {
        oscillator.frequency.value = 523; // نت C
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        oscillator.start();
        setTimeout(() => {
            oscillator.frequency.value = 659; // نت E
        }, 150);
        setTimeout(() => {
            oscillator.frequency.value = 784; // نت G
        }, 300);
        setTimeout(() => {
            oscillator.stop();
        }, 500);
    } else if (type === 'wrong') {
        oscillator.frequency.value = 300;
        oscillator.type = 'sawtooth';
        gainNode.gain.value = 0.2;
        oscillator.start();
        setTimeout(() => {
            oscillator.frequency.value = 200;
        }, 200);
        setTimeout(() => {
            oscillator.stop();
        }, 400);
    } else if (type === 'gameover') {
        // صدای پایان بازی (اختیاری)
        oscillator.frequency.value = 400;
        oscillator.type = 'square';
        gainNode.gain.value = 0.15;
        oscillator.start();
        setTimeout(() => {
            oscillator.frequency.value = 300;
        }, 200);
        setTimeout(() => {
            oscillator.frequency.value = 200;
        }, 400);
        setTimeout(() => {
            oscillator.stop();
        }, 600);
    }
}

function generateQuestion() {
    const base = Math.random() < 0.5 ? 8 : 9;
    num1 = base;
    num2 = Math.floor(Math.random() * 9) + 1;
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
        playSound('correct'); // 🎵 صدای درست
        questionEl.style.transform = 'scale(1.1)';
        setTimeout(() => {
            questionEl.style.transform = 'scale(1)';
        }, 300);
    } else {
        resultEl.textContent = `❌ نه! ${num1} × ${num2} = ${answer} بود. دوباره تلاش کن!`;
        resultEl.className = 'result wrong';
        playSound('wrong'); // 🎵 صدای غلط
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

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
newGameBtn.addEventListener('click', newGame);

newGame();