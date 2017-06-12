var app=angular.module('myApp',[]);
				
			//In-order to avoid repeated http call to Json data,
		//i have created a service to share json data b/w controller,but that is not working. 
			app.service('DataService', function () {
		     var Teamdata ={};
		    return Teamdata;
			});

		    app.controller('myCtrl',['$scope','$http','DataService',function($scope,$http,DataService){
		    	//getting cross origin error while accessing the json file from local,hence trying directly from HTTP URL.
		    	/*$http.get('js/2015.json')
		    	.then(function(response){
		    			alert('aa');
		    			$scope.Matchdata=response.data;
		    	})
		    	.error(function(){
		    		alert('bb');
		    			defer.reject('could not find json file');
		    	});*/
				$http({
				    method: 'get', 
				    url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
				})
				.then(function (response) {
				    
				    $scope.Matchdata = response.data;
				    console.log($scope.Matchdata.rounds[0], 'res');
				    
				}
				,function (error){
				    console.log(error, 'can not get data.');
					});
				
				$scope.detailpage = function (code) {
					//$window.location.href ='/views/detail.html?code=code';
					//$location.path("/views/detail.html");
				
					}
				}]);

		    //Controller for detail page
    app.controller('loadDetail',['$http','$scope','DataService',function($http,$scope,DataService){
		 //Get querystring value
		 this.getParameterByName = function(name){
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		      results = regex.exec(location.search);
		      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			}// end get parameter by name

		  $scope.code = this.getParameterByName('code');
		  		 
	  	this.loadSingledata = function(){
   		  $http({
	        method: 'GET',
	        url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
	      }).then(function successCallback(response) {
          
          $scope.Matchdata=response.data;
		});// end error function
		}// end load function
			
    }]); 

    
    app.controller('statsCtrl',['$http','$scope',function($http,$scope){
		 	$http({
				    method: 'get', 
				    url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
				})
				.then(function (response) {
				    $scope.Matchdata = response.data;
				     $scope.matchInfo=[];
				    //underscore JS is used for calculating min and max scores.
				    for (var x in $scope.Matchdata.rounds)
    				{
    					for (var y in $scope.Matchdata.rounds[x].matches)
    					{
			        	temp=$scope.Matchdata.rounds[x].matches;
			        	
			        	var ageArr = _.pluck(temp, 'score1');
			       		//_.max(temp, function(temp){ return temp.age; });
			       		$scope.min= _.min(ageArr);
						$scope.max= _.max(ageArr);
						
						 console.log('max score of '+ $scope.Matchdata.rounds[x].name +' is:'+ $scope.max +
						 	'|'+'min score of '+ $scope.Matchdata.rounds[x].name +' is:'+ $scope.min);
						}
						//getting match info as a summary
						temp1=$scope.Matchdata.rounds[x].name;
						$scope.matchInfo.push({mName:temp1,max:$scope.max,min:$scope.min});
			    		
    				}
    				
				});
			
    		}]); 

    