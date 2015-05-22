$(document).on("ready", function(){
  // debugger;
  var latitude = -34.397;
  var longitude = 150.644;

  function insertMap(latitude, longitude) {

    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);
  }

  insertMap(latitude, longitude);
});
