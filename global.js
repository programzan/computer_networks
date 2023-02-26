window.onscroll = function() {scrollFunction()};
document.getElementById("scrollTop").addEventListener("click", scrollTop);

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollTop").style.display = "block";
    } else {
        document.getElementById("scrollTop").style.display = "none";
    }
}

function scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("sidebar").style.left = "0";
    document.getElementById("id_open_menu").style.display = "none";
    document.getElementById("id_close_menu").style.display = "block";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("sidebar").style.left = "-250px";
    document.getElementById("id_open_menu").style.display = "block";
    document.getElementById("id_close_menu").style.display = "none";
}