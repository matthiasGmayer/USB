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