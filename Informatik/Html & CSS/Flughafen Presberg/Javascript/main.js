var bilderAnzahl = 3;
var i = Math.round(Math.random() * (bilderAnzahl - 1) + 1);
function changeImage() {
    if (i == bilderAnzahl + 1) {
        i = 1;
    }
    var url = 'url(../Bilder/Background/' + i + '.jpg) no-repeat center center fixed';
    document.body.style.background = url;
    document.body.style.backgroundSize = 'cover';
    i = i + 1;
    setTimeout("changeImage()", 30000);
}
function setwidth()
        {
            var width = window.innerWidth/10*6 - 125;
            document.getElementById('news').style.width = width + 'px';
            setTimeout("setwidth()", 100);
        }
function getTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var clock = (addZero(hours) + ":" + addZero(minutes) /*+ ":" + addZero(date.getSeconds())*/);
    document.getElementById('clock').innerHTML = clock;
}
function noTime() {
    document.getElementById('clock').innerHTML = '---:---'
}
function calculatePrice() {
    var Price1 = document.getElementById('Ziel').value;
    var ko1 = document.getElementById('Flug').value;
    var ko2 = document.getElementById('Klasse').value;
    var Price = Math.round(Price1 * ko1 * ko2);
    document.getElementById('Preis').innerHTML = Price + '€';
    /*var min = [(Math.round(Price1 / 5)) * 5, (Math.round(Price1 - 34 / 5)) * 5, (Math.round(Price1 - 11 / 5)) * 5];
    for (i = 0; i < 3; i++) {
        while(min[i]>60)
        { min[i] -= 60; }
    }
    document.Zeit.Zeiten[0] = min[1];*/
}
function relativeClock(h,m)
{
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours += h;
    minutes += m;
    minutes = Math.round(minutes / 5) * 5;
    if (minutes>59){
        hours++;
        minutes -= 60;
    }
    if (hours>23) {
        hours -= 24;
    }
    document.write("<p id=>" + addZero(hours) + ":" + addZero(minutes) + "</p>");
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
var date = new Date();
function writeDate(d,m)
{
    var month = date.getMonth();
    month += 1 - m;
    var date1 = date.getDate();
    date1 -= d;
    var year = date.getYear();
    year += 1900;
    if (date1 > 30)
    {
        month += 1;
        date1 -= 30;
    }
    if (month < 0)
    {
        month += 12;
        year -= 1;
    }
	if (month > 12)
	{
		month -=12;
	}
    document.write(addZero(date1) + "." + addZero(month) + "." + (year));
}
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
/*function Tremain(id)
{
    var hours1 = hours - date.getHours();
    document.getElementById(id.toString()).innerHTML = hours1.toString();
}*/