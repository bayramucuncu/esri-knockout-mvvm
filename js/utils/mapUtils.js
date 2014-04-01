define(["dojo/_base/declare", "esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/graphic","esri/InfoTemplate"],
	function(declare, PictureMarkerSymbol, Point, Graphic, InfoTemplate){
		return declare(null, {
			map: null,
			constructor: function(options){
				this.map = options.map;
			},
			addPinToLocation:function(location){
				var locationPoint = new Point({"x":location.x, "y":location.y, "spatialReference":this.map.spatialReference });
				var infoTemplate= new InfoTemplate("Event","Event Name: " + location.name);
				var pin = new PictureMarkerSymbol({
					"angle": 0,
					"xoffset": 0,
					"yoffset": 12,
					"type": "esriPMS",
					"url": "http://static.arcgis.com/images/Symbols/Basic/BlueShinyPin.png",
					"contentType": "image/png",
					"width": 24,
					"height": 24
				});

				var graphic = new Graphic(locationPoint, pin, null, infoTemplate);

				this.map.graphics.add(graphic);
			}
		})
})