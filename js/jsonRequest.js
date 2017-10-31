//API https://data.police.uk/docs/method/crime-street/
var request = new XMLHttpRequest();
var date = new Date();
var previousDate = new Date(date.setMonth(date.getMonth() - 2));
var month = previousDate.getMonth();
var year = previousDate.getFullYear();

if (month < 10){
    month = ("0" + month);
}

function getData(lat, lng){
    var requestURL = "https://data.police.uk/api/crimes-street/all-crime?lat=" + lat + "&lng=" + lng + "&date=" + year + "-" + month;
    $.get(requestURL, function(data){
        
    }).done(function(data) {
        
        initMap(data, lat, lng);
        $('#map-container').show();
  });
}