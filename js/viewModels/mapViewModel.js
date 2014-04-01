define(["dojo/_base/declare","esri/map", "viewmodel/searchViewModel", "knockout"],
	function(declare, Map,  SearchViewModel, ko){
      var mapViewModel = declare(null, {
          map: null,
          seatGeekService: null,
          constructor:function(){

            var mapOptions = {
                basemap:"streets",
                center: [-96, 37],
                zoom:4,
                logo:false
            };

            this.map = new Map("map", mapOptions);
            
            this.seatGeekService = new SearchViewModel({"map": this.map, "distance":"10mi", "perPage":"5"});
          }
      })

      return mapViewModel;
})