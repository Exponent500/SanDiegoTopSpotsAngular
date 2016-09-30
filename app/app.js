//creates an Angular module. First parameter is the name of the app. This should match the ng-app attribute that is included within the html tag. Second parameter is for dependencies. In this case it's a google maps for angular (?)
var myApp = angular.module('sanDiegoTopSpots', ['uiGmapgoogle-maps']); 

//creates an Angular controller. It says lets build a controller (MainController) and inject some things into it. One of those things is $scope. $scope allows us to bind data to the view (or HTML). Another is $http, which allows us, among other things, to pull data from a JSON file. Finally there is a handler function, which gets $scope and $html passed into it so it can use it within the function.
myApp.controller('MainController', ['$scope', '$http', function($scope, $http){ 

  //creates the default view of the google map upon initial load
  $scope.map = { 
    center: { 
      latitude: 32.7157,
      longitude: -117.1611
    },
    zoom: 12
  };

  $scope.markers = [];

  //populates our HTML table with data from within topspots.json and adds google maps markers to the google map
  $http.get('topspots.json') //http.get is a method to grab data from an external local json file (amongst other things)
    .then(function(result) { //stores data that was grabbed from topspots.json and places it into result
      $scope.topspots = result.data.topspots; //creates a new $scope variable that contains all the data within the local json file
      $scope.lat = $scope.topspots[0];
      $scope.long = result.data.topspots;
      var markers = result.data.topspots;
      _.forEach(markers, function(marker){ //grabs lat/lon data from json file and uses it to create the google maps markers
        marker.coords= {
          latitude: marker.location[0],
          longitude: marker.location[1]
        };
      });
    $scope.markers = markers;
    });


    // $scope.location = [];
    var arr=[];

    //adds a row to the table after submitting a form
    $scope.addRow = function(){
      
      arr[0] = $scope.latitude;
      arr[1] = $scope.longitude;
      // $scope.location.push($scope.latitude); //pushes the latitude value entered by user, into the location array
      // $scope.location.push($scope.longitude);
      $scope.topspots.push(
        { 
        'name':$scope.name,
        'description': $scope.description,
        'location': arr

        // 'latitude': $scope.latitude,
        // 'longitude': $scope.longitude
      });

      //clears these scope variables after adding a row
      $scope.name='';
      $scope.description='';
      $scope.location= '';
    };
    // //process form data and tries to add it to the local topspots.json
    // $scope.processForm = function() {
    //   $http.post('topspots.json', $scope.formData).success(function(data) {
    //     console.log(data);
    //   });
    // };
}]);


