// $(document).on("ready", function(){
//   // debugger;
//   // var latitude = -34.397;
//   // var longitude = 150.644;
//
//   function insertMap() {
//
//     // var myLatlng = new google.maps.LatLng(-34.397, 150.644);
//
//     var map = new google.maps.Map(mapCanvas, mapOptions);
//
//     var mapCanvas = document.getElementById('map-canvas');
//     var mapOptions = {
//       // center: myLatlng,
//       // zoom: 8,
//       mapTypeId: google.maps.MapTypeId.TERRAIN
//     };
//
//
//
//     var markers = [
//           ['London Eye, London', 51.503454,-0.119562],
//           ['Palace of Westminster, London', 51.499633,-0.124755]
//       ];
//
//
//       // Loop through our array of markers & place each one on the map
//     for( i = 0; i < markers.length; i++ ) {
//         var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//         bounds.extend(position);
//         marker = new google.maps.Marker({
//             position: position,
//             map: map,
//             title: markers[i][0]
//         });
//
//         // Allow each marker to have an info window
//         google.maps.event.addListener(marker, 'click', (function(marker, i) {
//             return function() {
//                 infoWindow.setContent(infoWindowContent[i][0]);
//                 infoWindow.open(map, marker);
//             }
//         })(marker, i));
//
//         // Automatically center the map fitting all markers on the screen
//         map.fitBounds(bounds);
//     }
//   }
//
//   // insertMap();
//   // marker();
// });
