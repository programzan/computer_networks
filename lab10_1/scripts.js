function welcomeMessage() {
    alert("Добро пожаловать! Хорошего дня!");
}

function currentTime() {
    let date = new Date();
    let hour = date.getHours(); let min = date.getMinutes(); let sec = date.getSeconds();
    hour = updateTime(hour); min = updateTime(min); sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + ":" + min + ":" + sec;
    setTimeout(function () {
        currentTime()
    }, 1000);
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

function calculateDaysBetween() {
    const dateFrom = new Date(document.forms["date-calculator"]["date-from"].value);
    const dateTo = new Date(document.forms["date-calculator"]["date-to"].value);
    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = dateTo.getTime() - dateFrom.getTime();
    const diffInDays =  Math.round(diffInTime / oneDay);

    const newWindow = window.open("", "Результат расчета", "popup,width=400,height=300");
    newWindow.document.body.innerHTML =
        `
        <div class="result bg-light border-shadow border-radius">
            <div class="result-title">
                <h3>Результат расчета</h3>
            </div>
            <div class="result-main">
                <div class="result-item">
                    <p>Начальная дата: ${dateFrom.toLocaleDateString()}</p>
                </div>
                <div class="result-item">
                    <p>Конечная дата: ${dateTo.toLocaleDateString()}</p>
                </div>
                <div class="result-item">
                    <strong>Количество дней между датами: ${diffInDays}</strong>
                </div>
            </div>
        </div>
        `
    newWindow.document.body.style.margin = "5%";
}

function moveBanner(banner){
    if (x >= window.screen.width - 400 || x <= 5) {
        dx = -dx;
    }
    x += dx;
    banner.style.marginLeft = x + "px";
}


function calendar(id, year, month) {
    let i;
    let lastDayOfMonth = new Date(year, month + 1, 0).getDate(),
        D = new Date(year, month, lastDayOfMonth),
        lastWeekDayOfMonth = new Date(D.getFullYear(), D.getMonth(), lastDayOfMonth).getDay(),
        firstWeekDayOfMonth = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
        calendar = '<tr>',
        months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    if (firstWeekDayOfMonth !== 0) {
        for (i = 1; i < firstWeekDayOfMonth; i++) calendar += '<td>';
    } else {
        for (i = 0; i < 6; i++) calendar += '<td>';
    }
    for (i = 1; i <= lastDayOfMonth; i++) {
        if (i === new Date().getDate() &&
            D.getFullYear() === new Date().getFullYear() &&
            D.getMonth() === new Date().getMonth()) {
            calendar += '<td class="today">' + i;
        } else {
            calendar += '<td>' + i;
        }
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() === 0) {
            calendar += '<tr>';
        }
    }
    for (i = lastWeekDayOfMonth; i < 7; i++) calendar += '<td> ';
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector(
        '#' + id + ' thead tr.month-year td').innerHTML = months[D.getMonth()] + ' ' + D.getFullYear();
}


/*=======================Function calls=========================*/
currentTime();

calendar("calendar", new Date().getFullYear(), new Date().getMonth());

let dx = 1;
let x = 10;
let banner = document.getElementById("banner-1");
setInterval(() => moveBanner(banner), 1);