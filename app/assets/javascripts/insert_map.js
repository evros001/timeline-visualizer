$(document).on("ready", function(){
  // debugger;
  // var latitude = -34.397;
  // var longitude = 150.644;

  function insertMap() {

    var myLatlng = new google.maps.LatLng(-34.397, 150.644);

    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: myLatlng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);

    var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Hello World!'
      });
  }

  insertMap();
  // marker();
});
