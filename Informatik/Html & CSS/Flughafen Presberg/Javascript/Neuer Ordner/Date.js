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
    document.write(addZero(date1) + "." + addZero(month) + "." + (year));
}
