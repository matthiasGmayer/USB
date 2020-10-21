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
changeImage();