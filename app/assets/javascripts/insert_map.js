jQuery(function($) {
  // Asynchronously Load the map API
  var script = document.createElement('script');
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
});

function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}] 

  var mapOptions = {
      mapTypeId: 'terrain', 
      styles: style
  };

  // Display a map on the page
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  map.setTilt(45);

  //creating infowindow on map
  var infoWindow = new google.maps.InfoWindow()

  //ajax call
  var url = window.location.href + "/markers.json";

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
      singleMarker.push(data["markers"][i]["description"]);
      arr.push(singleMarker);
    }
    return arr
  }

  var star = "http://oi58.tinypic.com/ic4l5j.jpg"

  function plotPoints(markers){
    for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0], 
        icon: star
       });

      //assign click handler to each location icon
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
              infoWindow.setContent("<h3>"+markers[i][0]+"</h3>"+"<p>"+markers[i][3]+"</p>"+"<img src=''>");
              infoWindow.open(map, marker);
        }
      })(marker, i));
    }

    map.fitBounds(bounds);
  }


}
