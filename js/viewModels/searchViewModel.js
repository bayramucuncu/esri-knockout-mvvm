define(["dojo/_base/declare", "dojo/_base/lang", "dojo/on", "esri/request", "esri/geometry/Point", 
		"esri/geometry/webMercatorUtils","utils/mapUtils", "knockout"], 
	function(declare, lang, on, esriRequest, Point, webMercatorUtils, MapUtils, ko){
	var widget = declare(null, {
		map: null,
		mapUtils:null,
		distance: null,
		perPage: null,
		queryParams: null,
		seatGeekUrl: null,
		clickSearchEvent: null,
		events: null,
		isBusy: null,
		isFound: null,

		constructor: function(options){
			this.map = options.map;
			this.mapUtils = new MapUtils({"map": this.map});
			this.distance = options.distance ? ko.observable(options.distance): ko.observable("20mi");
    		this.perPage = options.perPage ? ko.observable(options.perPage) : ko.observable(50); 
    		this.seatGeekUrl = "http://api.seatgeek.com/2/events";
    		
    		this.events = ko.observableArray();
    		this.isBusy = ko.observable(false);
    		this.isFound = ko.computed(function(){
    			return this.events().length > 0;
    		},this);

    		this.returnEvents = lang.hitch(this, this.returnEvents);
    		this.onMapClickHandled = lang.hitch(this, this.onMapClickHandled);
    		this.onEventResultSuccess = lang.hitch(this, this.onEventResultSuccess);
    		this.zoomin = lang.hitch(this, this.zoomin);

    		on(this.map, "click", this.onMapClickHandled);
		},
		onMapClickHandled: function(args){
			this.events([]);
			this.isBusy(true);

			var longlat = webMercatorUtils.xyToLngLat(args.mapPoint.x, args.mapPoint.y);
            var geopoint = {"x":longlat[0], "y": longlat[1]};

		    this.queryParams = {
		      "lat": geopoint.y,
		      "lon": geopoint.x,
		      "page": 1,
		      "per_page": this.perPage(),
		      "range": this.distance()
		    }

		    var eventsResponse = esriRequest({
		      "url": this.seatGeekUrl,
		      "callbackParamName": "callback",
		      "content": this.queryParams
		    });

		    eventsResponse.then(this.onEventResultSuccess, this.onEventResultFailed);            
        },

	    onEventResultSuccess: function(response) {
	    	this.isBusy(false);

		    if (response && response.events.length > 0 ) {
		      	this.events(response.events);
		    }
	  	},

	  	zoomin: function(args){
	  		var xypoint = webMercatorUtils.lngLatToXY(args.venue.location.lon,args.venue.location.lat);

	  		var zoompoint = new Point({
	  			"x":xypoint[0],
	  			"y":xypoint[1], 
	  			"spatialReference":this.map.spatialReference});

	  		this.map.centerAndZoom(zoompoint, 14);
	  		this.mapUtils.addPinToLocation({ "x":xypoint[0], "y":xypoint[1], "name":args.title });
	  	},

		onEventResultFailed: function(err) {
			console.log("Failed to get results from Seat Geek due to an error: ", err);
		},
		refresh:function(){
			this.map.setLevel(4);
			this.map.graphics.clear();
			this.events([]);
		}
	})
	
	return widget;
})