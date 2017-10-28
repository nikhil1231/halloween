function initMap(locations, userlat, userlng) {
    if (locations === undefined){
        return null;
    }
    console.trace();
    console.log("here initMap " + locations.length);
    var center = new google.maps.LatLng(userlat, userlng);

    
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: center,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
    var markers = [];
    
    for (var i = 0; i < locations.length; i++){
        var latLng = new google.maps.LatLng(locations[i].lat,
      locations[i].lng);
        var marker = new google.maps.Marker({'position': latLng});
        markers.push(marker);
    }
   
    var markerCluster = new MarkerClusterer(map, markers);
    
}
      
      