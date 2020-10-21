var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
function init(m, h, id) {
    hours += h;
    minutes += m;
    minutes = Math.round(minutes / 5) * 5;
    if (minutes > 59) {
        hours++;
        minutes -= 60;
    }
    if (hours > 23) {
        hours -= 24;
    }
   // var clock = (addZero(hours) + ":" + addZero(minutes) /*+ ":" + addZero(date.getSeconds())*/);
}
function Tremain(id)
{
    var hours1 = hours - date.getHours();
    document.getElementById(id.toString()).innerHTML = hours1.toString();
}
function noTime(id) {
    document.getElementById(id.toString()).innerHTML = '---:---'
}