
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