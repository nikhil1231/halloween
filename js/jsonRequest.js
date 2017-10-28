//API https://data.police.uk/docs/method/crime-street/

var request = new XMLHttpRequest();
var date = new Date();
var previousDate = new Date(date.setMonth(date.getMonth() - 1));
var month = previousDate.getMonth();
var year = previousDate.getFullYear();

if (month < 10){
    month = ("0" + month);
}

console.log(previousDate);
console.log(month + " " + year);

var userlat = parseFloat(52.627161);
var userlng = parseFloat(-1.131592);

var requestURL = "https://data.police.uk/api/crimes-street/all-crime?lat=" + userlat + "&lng=" + userlng + "&date=" + year + "-" + month;

console.log(requestURL);


function getData(){
    $.get(requestURL, function(data){
        var locations = [];
        for (var count = 0; count < data.length; count ++){
            locations.push({lat : parseFloat(data[count].location.latitude), lng : parseFloat(data[count].location.longitude) });
        }
        console.log(locations);
        
        initMap(locations, userlat, userlng);
    });
}

getData();