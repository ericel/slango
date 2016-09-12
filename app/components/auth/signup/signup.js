'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('SignupCtrl', function ( $scope, $interval, geoLocation, authService, firebaseService, $location, $timeout) {
    $scope.$parent.seo = {
        pageTitle : 'Sign Up To Gotube',
        pageDescripton: 'Register a free account with gotube videos'
    };
    var vm = this;
    $scope.formValid = false;
    geoLocation.getLocation().then(function(result){
        vm.location = result;
        
        vm.locationlat = vm.location.latitude;
        vm.locationlong = vm.location.longitude;
        vm.address = vm.location.address_01[0].long_name + ',' + vm.location.address_01[1].long_name + ',' + vm.location.address_01[2].long_name;
        vm.city = vm.location.address_01[3].long_name;
        vm.country = vm.location.address_01[4].long_name;
        vm.zip = vm.location.address_01[5].long_name;
       
  
        $scope.form = {};
        $scope.form.country = vm.country;
       
    }); // geolocation
    
   
    vm.getDatetime = new Date().toJSON();
    
    vm.auth = authService.isLoggedIn();
    $scope.createUser = function() {
       if (typeof $scope.form.country === 'undefined'){
         $scope.form.country = "location was denied!";
        }
      vm.country = $scope.form.country;
      $scope.message = null;
      $scope.error = null;
      var userName = $scope.username;
      var email = $scope.uemail;
      var password = $scope.upassword;
      var imageUrl = './images/avatar.png';
      $scope.hideForm = false;
      vm.determinateValue = 3000;
     if(!angular.equals(password, $scope.upassword1)){
        return;
     }

      // Create a new username, email, imageUrl
      authService.createUser(email, password)
	    .then(function(user){
          $scope.hideForm = true;
          $scope.message = "User id: " + user.uid;
          vm.uid = user.uid;
          firebaseService.writeUserData(user.uid, userName, email, imageUrl, vm.country, vm.getDatetime);
	    })
        .then(function(){
        	
        	authService.login(email, password);
        })
        .then(function() {

         vm.auth.$onAuthStateChanged(function(user) {
          
           user.updateProfile({
	        displayName: userName  
	      });
          });
          
        }).then(function() {
         vm.auth.$onAuthStateChanged(function(user) {
           user.sendEmailVerification(); 
       	 });
	     $timeout (function(user){
	       	 $location.path('/user/'+vm.uid+'/'+userName+'');
	     }, 3000);
        })
       .catch(function(error) {
          $scope.error = error.message;
          console.log($scope.error.message);
        });


    };
    
    
  })
  .directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    // console.info(elem.val() === $(firstPassword).val());
                    ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                });
            });
        }
    };
}]);
