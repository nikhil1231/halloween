function initMap(locations, userlat, userlng) {
    if (locations === undefined){
        return null;
    }

    $('.header').show();
    $('#back-button').click(function(){
      location.reload();
    });
    $("#postcode-error").html('');


    $('#map').height(window.innerHeight-50);

    var center = new google.maps.LatLng(userlat, userlng);
    
    var styledMapType = new google.maps.StyledMapType(styledText);
    
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: center,
          mapTypeId: 'hybrid',
          mapTypeControl: true,
          mapTypeControlOptions: {      
            mapTypeIds: [
            ]
          }
        });

    $('#toggleheatmap').click(function(){
      heatmap.setMap(heatmap.getMap() ? null : map);
    })
    $('#togglemap').click(function(){
      if(markerCluster.getMarkers().length){
        markerCluster.clearMarkers();
      }else{
        markerCluster.addMarkers(markers);
        markerCluster.setMap(map);
      }
    })
    var image = "img/pinpoint.png";
    
    var oneCrimeMaker = new google.maps.Marker({
          position: {lat: userlat, lng: userlng},
          map: map,
          icon: image
    });
    
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    
    var heatmarkers = [];
    var markers = [];
    
    for (var i = 0; i < locations.length; i++){
        
        var latitude = parseFloat(locations[i].location.latitude);
        var longitude = parseFloat(locations[i].location.longitude);
        
        var latLng = new google.maps.LatLng(latitude,longitude);

        var heatmarker = new google.maps.LatLng(latitude,longitude);
        heatmarkers.push(heatmarker);

        var marker = new google.maps.Marker({'position': latLng});
        markers.push(marker);
    }

    heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmarkers,
          map: map,
          radius: 80,
          opacity: 0.5
        });
   
    var markerCluster = new MarkerClusterer(map, markers);
    markerCluster.clearMarkers();
}
      