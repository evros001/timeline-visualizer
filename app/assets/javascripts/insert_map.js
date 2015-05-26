jQuery(function($) {
  // Asynchronously Load the map API
  var script = document.createElement('script');
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
});

function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
      mapTypeId: 'terrain'
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.setTilt(45);

  var userId = $("#user_id").text();
  var url = "/users/" + userId + "/markers.json";

  var getMarkers = function(){
    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json"
    });
  }

  var jsonResponse = getMarkers().done(function(data){
    var markers = formatData(data)
    plotPoints(markers)
  });

  function formatData(data){
    var arr = [];

    for( i = 0; i < data["markers"].length; i++ ) {
      var singleMarker = [];
      singleMarker.push(data["markers"][i]["name"]);
      singleMarker.push(data["markers"][i]["latitude"]);
      singleMarker.push(data["markers"][i]["longitude"]);
      arr.push(singleMarker);

    }
    return arr
  }

  // reference marker stuff:
   //  return [
   //       ['Flatiron School', 40.705329,-74.01397],
   //       ['Brooklyn Museum', 40.671206,-73.963631],
   //       ['The Grand Canyon', 36.3078536,-112.7834806]
   // ];
  
   

  function plotPoints(markers){
    for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
       });
    }

    // Allow each marker to have an info window
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
  }

  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
  //   this.setZoom(14);
  //   google.maps.event.removeListener(boundsListener);
  // });

}