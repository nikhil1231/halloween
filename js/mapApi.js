function initMap(locations, userlat, userlng) {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: parseFloat(userlat), lng: parseFloat(userlng)}
    });

    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'image/m'});
}
      
      