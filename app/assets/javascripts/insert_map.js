jQuery(function($) {
  // Asynchronously Load the map API
  var script = document.createElement('script');
  script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
});



function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var style = [
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "invert_lightness": false
            },
            {
                "color": "#004963"
            },
            {
                "weight": 8
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "invert_lightness": false
            },
            {
                "color": "#b7ebeb"
            },
            {
                "saturation": -53
            },
            {
                "lightness": 2
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "invert_lightness": false
            },
            {
                "hue": "#767878"
            },
            {
                "saturation": -93
            },
            {
                "lightness": 56
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b8dbe0"
            },
            {
                "saturation": -7
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -1
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d1e6d7"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 61
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 80
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#d74340"
            },
            {
                "saturation": -32
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d74340"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "lightness": 0
            },
            {
                "gamma": 2.05
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 78
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 54
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 28
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
]

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

  var star = "https://openmerchantaccount.com/img/quote_marker.png"


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
