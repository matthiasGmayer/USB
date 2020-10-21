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