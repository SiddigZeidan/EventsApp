var events = angular.module('myApp',['geolocation'])
  events.controller('mainCtrl', function ($scope, geolocation) {
    $scope.coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
    });


    $.get("http://ipinfo.io", function (response) {
        var city = response.city;
        var country = response.country;
        console.log (city, country);
     $.ajax({
            type : 'GET',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            url: 'https://hypecal-events.p.mashape.com/search.json?key=%3Ckey%3E&city=' + city + '&country=' + country + '&limit=30',
            data: {},
             success: function(data){
                $scope.$apply(function(){ //necessary to $apply the changes
                    
                    $scope.coinList = data.result;
                    console.log($scope.coinList);
                    $scope.city = city;
                    $scope.country = country;
                    
                });
            },
            error : function(xhr, ajaxOptions, thrownError) {
                alert( "Error: " + xhr.responseText + "\n" + thrownError );
            },
       beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "0gJJeRO9FbHlLSgXqLM8O1cRuzcKTkGp");
        }
        });

    }, "jsonp");



         


 
    

});

