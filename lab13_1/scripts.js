const TIME = 5 * 60 * 1000;
let timerId = 0;
let timeoutId = 0;

const radioButtons = document.querySelectorAll('input[type="radio"]');
const textFields = document.querySelectorAll('input[type="text"]');

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', () => {
        radioButton.checked = true;
    });
});

function getTimeStr(ms){
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms - minutes * 60000) / 1000);
    return `${minutes} мин. ${seconds} сек.`;
}

function testProcess() {
    document.getElementById("test-preview").style.display = "none";
    document.getElementById("test-process").style.display = "block";
    document.getElementById("submit").style.display = "block";

    let now = Date.now();
    let timer = document.getElementById("timer");

    timeoutId = setTimeout(() => {alert("Время вышло!"); testEnd()}, TIME);
    timerId = setInterval(() => timer.innerText =
        "Осталось времени: " + getTimeStr(TIME - (Date.now() - now)), 500);
}

function testEnd() {
    clearTimeout(timeoutId);
    clearInterval(timerId);

    let countQuestions = document.getElementsByClassName('question').length;
    let questions = document.querySelectorAll('.question');
    let score = 0;
    let rightAnswers = ['r_12', 'r_23', 'r_34', 'input', 'focus', 'document object model'];
    let userAnswer;

    for (let i = 0; i < countQuestions; i++) {
        if (questions[i].querySelectorAll('.answer')[0].type === "radio") {
            userAnswer = questions[i].querySelector('.answer:checked');
            if (userAnswer && userAnswer.id === rightAnswers[i])
            {
                score++;
                questions[i].style.backgroundColor = "var(--primary-green)";
            } else {
                questions[i].style.backgroundColor = "var(--primary-red)";
            }
        } else {
            userAnswer = questions[i].querySelector("input[type='text']");
            if (userAnswer && userAnswer.value === rightAnswers[i])
            {
                score++;
                questions[i].style.backgroundColor = "var(--primary-green)";
            } else {
                questions[i].style.backgroundColor = "var(--primary-red)";
            }
        }
    }

    document.getElementById("test-result").style.display = "block";
    document.getElementById("timer").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("resolve").style.display = "block";
    document.getElementById("test-result").innerText =
        "Результат: " + score + " правильных ответов из " + countQuestions + " возможных.";
}

function testResolve() {
    let questions = document.getElementsByClassName('question');
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.backgroundColor = "var(--light)";
    }
    radioButtons.forEach(radioButton => {
        radioButton.checked = false;
    });
    textFields.forEach(textField => {
        textField.value = "";
    });
    document.getElementById("test-result").style.display = "none";
    document.getElementById("timer").style.display = "flex";
    document.getElementById("resolve").style.display = "none";
    testProcess();
}