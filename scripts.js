
function getMovies() {

  var raaka = document.getElementById("pvm").value;
  var aika = raaka.slice(8, 10) + "." + raaka.slice(5, 7) + "." + raaka.slice(0, 4);
  var teatteri = document.getElementById("teatteri").value;
  var url = "https://www.finnkino.fi/xml/Schedule/?area=" + teatteri + "&dt=" + aika;


  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, true);
  xmlhttp.send()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var xmlDoc = xmlhttp.responseXML;
    txt = "";
    pic = xmlDoc.getElementsByTagName("EventLargeImageLandscape");
    title = xmlDoc.getElementsByTagName("Title");
    theatre = xmlDoc.getElementsByTagName("TheatreAndAuditorium");
    showstart = xmlDoc.getElementsByTagName("dttmShowStart");
    showend = xmlDoc.getElementsByTagName("dttmShowEnd");
    riu = xmlDoc.getElementsByTagName("RatingImageUrl");
    esitysLinkit = xmlDoc.getElementsByTagName("ShowURL");
    tietoLinkit = xmlDoc.getElementsByTagName("EventURL");

      var out = '<div class="card-columns">';
    for (i = 0; i < title.length; i++) {
      var aika = showstart[i].innerHTML.slice(11, 16);
      var loppu = showend[i].innerHTML.slice(11, 16);
      out += '<div class="card" style="width:350px;">';
      out += '<img class="card-img-top" src="' + pic[i].childNodes[0].nodeValue + '" alt="Elokuvan kuva" style=width:100%">';
      out += '<div class="card-body">';
      out += '<h4 class="card-title">' + title[i].childNodes[0].nodeValue + '</h4>';
      out += '<h6 class="card-text">' + theatre[i].childNodes[0].nodeValue + '</h6>';
      out += '<p class="card-text">' + aika + ' - ' + loppu + '<img src="' + riu[i].childNodes[0].nodeValue + '" align="right"></p>';
      out += '<a href="' + esitysLinkit[i].innerHTML + '" class="btn btn-success">Osta Liput</a>';
      out += '<a href="' + tietoLinkit[i].innerHTML + '" class="btn btn-info">Elokuvan Tiedot</a>';
      out += '</div>';
      out += '</div>';
      out += '<br>';
    };
      out += '</div>';
    document.getElementById("leffa").innerHTML = out;


  }
}
};
