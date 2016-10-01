//create Angular module with a dependency of angular google maps
var myApp = angular.module('sanDiegoTopSpots', ['uiGmapgoogle-maps']); 

//create Angular controller and inject scope/http into it
myApp.controller('MainController', ['$scope', '$http', function($scope, $http){ 

  //creates the default view of the google map upon initial load
  $scope.map = { 
    center: { 
      latitude: 32.7157,
      longitude: -117.1611
    },
    zoom: 12
  };

  var markers = [];

  //populates our HTML table with data from within topspots.json and adds google maps markers to the google map
  $http.get('topspots.json') //http.get is a method to grab data from an external local json file (amongst other things)
    .then(function(result) { //stores data that was grabbed from topspots.json and places it into result
      markers = result.data.topspots;
      $scope.topspots = markers; //creates a new $scope variable that contains all the data within the local json file
      
      _.forEach(markers, function(marker){ //grabs lat/lon data from json file and uses it to create the google maps markers.
        marker.coords= { 
          latitude: marker.location[0],
          longitude: marker.location[1]
        };
      });
    $scope.markers = markers;
    });

    var location=[];

    //adds a row to the table after submitting a form
    $scope.addRow = function(){
      
      location[0] = $scope.latitude;
      location[1] = $scope.longitude;
      $scope.topspots.push(
        { 
        'name':$scope.name,
        'description': $scope.description,
        'location': location
      });

      //clears these scope variables after adding a row
      $scope.name='';
      $scope.description='';
      $scope.location= '';
    };
}]);


