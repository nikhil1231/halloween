function initMap(locations, userlat, userlng) {
    if (locations === undefined){
        return null;
    }
    var center = new google.maps.LatLng(userlat, userlng);
    
    var styledMapType = new google.maps.StyledMapType(styledText);
    
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: center,
          mapTypeId: 'hybrid'
        });
    
    var image = "/../img/pinpoint.png";
    console.log(image);
    
    var oneCrimeMaker = new google.maps.Marker({
          position: {lat: userlat, lng: userlng},
          map: map,
          icon: image
    });
    
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    
    var markers = [];
    
    for (var i = 0; i < locations.length; i++){
        var latLng = new google.maps.LatLng(locations[i].lat,
      locations[i].lng);
        
        var marker = new google.maps.Marker({'position': latLng});
        markers.push(marker);

    }
   
    var markerCluster = new MarkerClusterer(map, markers);
}
      
      