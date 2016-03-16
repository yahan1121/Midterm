//Create a map object and specify the center lat/lon and zoom level
var map;
require([
	"esri/map",
	"esri/layers/ArcGISDynamicMapServiceLayer",// modules need to be added to this list before dojo/domReady, separated by a comma and enclosed in quotation marks
  "esri/dijit/BasemapToggle",
	"dojo/domReady!"
], function (
  Map,
	ArcGISDynamicMapServiceLayer,
	BasemapToggle// the names of functions corresponding to the modules need to be added to this list, separated by a comma
) {
  map = new Map("map", {
    basemap: "topo", // list of basemap names: https://developers.arcgis.com/javascript/jsapi/esri.basemaps-amd.html
    center: [-90, 30],
    zoom: 4
  });

	var layer1 = new ArcGISDynamicMapServiceLayer( "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_windspeed_offsets/MapServer" );
	map.addLayer(layer1); // add the layer object to the map

	// Create a layer object from an ArcGIS Server web service, setting the opacity option
	var layer2 = new ArcGISDynamicMapServiceLayer( "http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_windgust_offsets/MapServer", {
	  "opacity": 0.35
	});
	map.addLayer(layer2); // add the layer object to the map  // code to add layers and map control goes here

	var toggle = new BasemapToggle({
	  map: map,
	  basemap: "hybrid"
	}, "BasemapToggle");
	toggle.startup();

});
