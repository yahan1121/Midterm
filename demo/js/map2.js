//Create a map object and specify the center lat/lon and zoom level
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30, lng: -99},
		zoom: 4
	});
	var kml1 = new google.maps.KmlLayer({
	  url: 'http://droughtmonitor.unl.edu/data/kmz/usdm_current.kmz',
	  preserveViewport: true // setting to true will prevent the map from zooming to this layer
	});
	kml1.setMap( map );

	map.data.loadGeoJson('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');

	// Create an infowindow object to use later
	var infowindow = new google.maps.InfoWindow();

	/* Create a "listener" that will wait for the user to click an earthquake point,
	 * and then display the infowindow with details about that earthquake.
	 */
	map.data.addListener('click', function(event) {
	  // in the geojson feature that was clicked, get the "place" and "mag" attributes
	  var place = event.feature.getProperty("place");
	  var magnitude = event.feature.getProperty("mag");
	  var html = magnitude + ' magnitude, ' + place; // combine place and magnitude, inserting additional text between them
	  infowindow.setContent(html); // show the html variable in the infowindow
	  infowindow.setPosition(event.feature.getGeometry().get()); // anchor the infowindow at the marker
	  infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)}); // move the infowindow up slightly to the top of the marker icon
	  infowindow.open(map);
	});

}
