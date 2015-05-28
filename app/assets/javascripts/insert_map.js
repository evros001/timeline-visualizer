jQuery(function($) {
  // Asynchronously Load the map API
  var script = document.createElement('script');
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
});



function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var style = [{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"weight":1}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"weight":0.8}]},{"featureType":"landscape","stylers":[{"color":"#ffffff"}]},{"featureType":"water","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.text","stylers":[{"visibility":"on"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"elementType":"labels.icon","stylers":[{"visibility":"on"}]}] 

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
  if(window.location.href === "http://localhost:3000/"){
    var url = window.location.href + "markers.json";
  }
  else{
    var url = window.location.href + "/markers.json";
  }

  var getMarkers = function(){
    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json"
    });
  }

  var jsonResponse = getMarkers().done(
    function(data){
    var markers = formatData(data)
    plotPoints(markers)
  });

  var jsonResponseFail = getMarkers().fail(
    function(data){
    var markers = [["Flatiron School", 40.705866, -74.014056, "A Place To Learn"], ["Yankee Stadium", 40.830406, -73.926088, "ballgame!"]]
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
