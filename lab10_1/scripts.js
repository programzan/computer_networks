function welcomeMessage() {
    alert("Добро пожаловать! Хорошего дня!");
}

function currentTime() {
    let date = new Date();
    let hour = date.getHours(); let min = date.getMinutes(); let sec = date.getSeconds();
    hour = updateTime(hour); min = updateTime(min); sec = updateTime(sec);
    document.getElementById("clock").innerText = hour + ":" + min + ":" + sec;
    let t = setTimeout(function () {
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

    document.body.innerHTML =
        `
        <div class="result bg-light border-shadow border-radius">
            <div class="result-title">
                <h3>Результат расчета</h3>
            </div>
            <div class="result-main">
                <div class="result-item">
                    <p>Начальная дата: ${dateFrom}</p>
                </div>
                <div class="result-item">
                    <p>Конечная дата: ${dateTo}</p>
                </div>
                <div class="result-item">
                    <strong>Количество дней между датами: ${diffInDays}</strong>
                </div>
            </div>
        </div>
        `
}

function moveBanner(banner){
    if (x >= window.screen.width - 400 || x <= 5) {
        dx = -dx;
    }
    x += dx;
    banner.style.marginLeft = x + "px";
}


function calendar(id, year, month) {
    var Dlast = new Date(year, month + 1, 0).getDate(),
        D = new Date(year, month, Dlast),
        DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
        calendar = '<tr>',
        month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    if (DNfirst != 0) {
        for (var i = 1; i < DNfirst; i++) calendar += '<td>';
    } else {
        for (var i = 0; i < 6; i++) calendar += '<td>';
    }
    for (var i = 1; i <= Dlast; i++) {
        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
            calendar += '<td class="today">' + i;
        } else {
            calendar += '<td>' + i;
        }
        if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
            calendar += '<tr>';
        }
    }
    for (var i = DNlast; i < 7; i++) calendar += '<td> ';
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
        // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
    }
}


/*=======================Function calls=========================*/
currentTime();

calendar("calendar", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
}
// переключатель плюс месяц
document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
}

let dx = 1;
let x = 10;
let banner = document.getElementById("banner");
setInterval(() => moveBanner(banner), 1);