      var dojoConfig = {
        parseOnLoad: true,
        async: true,
        packages:[
          {
            "name": "knockout", 
            "location": location.pathname.replace(/\/[^/]+$/, '') + "js/knockout", 
            "main": "knockout-3.0.0"
          },
          {
            "name": "viewmodel",
            "location": location.pathname.replace(/\/[^/]+$/, '') + "js/viewModels"
          },
          {
            "name": "utils",
            "location": location.pathname.replace(/\/[^/]+$/, '') + "js/utils"
          }
        ]
      }