const TIME = 5 * 60 * 1000;
let timerId = 0;
let timeoutId = 0;

const radioButtons = document.querySelectorAll('input[type="radio"]');
const textFields = document.querySelectorAll('input[type="text"]');
const radioQuestions = document.getElementsByClassName('question-radio');
const textQuestions = document.getElementsByClassName('question-text');

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

    let radioAnswerIds = ['#r_12', '#r_23', '#r_34'];
    let textAnswers = ['input', 'focus', 'document object model'];
    let textAnswerIds = ['#text-1', '#text-2', '#text-3'];
    let countQuestions = radioQuestions.length + textQuestions.length;
    let score = 0;

    for (let i = 0; i < radioQuestions.length; i++) {
        if (document.querySelector(radioAnswerIds[i]).checked)
        {
            score++;
            radioQuestions[i].style.backgroundColor = "var(--primary-green)";
        } else {
            radioQuestions[i].style.backgroundColor = "var(--primary-red)";
        }
    }

    for (let i = 0; i < textQuestions.length; i++) {
        if (document.querySelector(textAnswerIds[i]).value === textAnswers[i])
        {
            score++;
            textQuestions[i].style.backgroundColor = "var(--primary-green)";
        } else {
            textQuestions[i].style.backgroundColor = "var(--primary-red)";
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
    for (let i = 0; i < radioQuestions.length; i++) {
        radioQuestions[i].style.backgroundColor = "var(--light)";
    }
    for (let i = 0; i < textQuestions.length; i++) {
        textQuestions[i].style.backgroundColor = "var(--light)";
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