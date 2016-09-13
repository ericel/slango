'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('UserCtrl', function ($scope, $stateParams, authService, firebaseService, $interval, currentAuth, $location) {
  	var vm = this;
    vm.user = $stateParams.user;
    vm.uid = $stateParams.uid;

  	$scope.$parent.seo = {
        pageTitle : vm.user + ' ' + 'User account',
        pageDescripton: 'slango user account'
    };
    
    vm.auth = authService.isLoggedIn();
     var storageRef = firebase.storage().ref();
    
  firebaseService.getUser(vm.uid).then( function(snapshot){
  	console.log(snapshot.val());
     vm.username = snapshot.val().username;
     vm.userUrlImg = snapshot.val().profile_picture;
     vm.country  = snapshot.val().country;
     vm.signupdate = snapshot.val().sign_date;
     $scope.$apply();
  }).catch(function(error){
     $location.path('/');
  });
		  
  
    vm.auth.$onAuthStateChanged(function(user) {
      $scope.slangoUser = user;
     if (currentAuth && vm.uid === $scope.slangoUser.uid) {
     	$scope.slangoUserIS = true;
     $scope.testImage = function(url, timeoutT) {
        return new Promise(function(resolve, reject) {
          var timeout = timeoutT || 5000;
          var timer, img = new Image();
          img.onerror = img.onabort = function() {
              clearTimeout(timer);
              //reject("error");
               vm.userUrlImg = './images/avatar.png';
          };
          img.onload = function() {
               clearTimeout(timer);
               resolve("success");
               vm.userUrlImg = url;
          };
          timer = $interval(function() {
              //reject("timeout");
          }, timeout); 
          img.src = url;
        });
    };
    if( $scope.slangoUser){
     $scope.testImage($scope.slangoUser.photoURL);
    }
    $scope.functionBCompleted = false;
    $scope.roundNumber = function(i) {
    return Math.ceil(i) 
    }

    var myEl = angular.element( document.querySelector( '#file-5' ) );
		myEl.bind('change', function(e) {
        /*TODO: Make sure file is of type image */
		$scope.handleFileSelect = function() {
	      e.stopPropagation();
	      e.preventDefault();
	      var file = e.target.files[0];
	      var metadata = {
	        'contentType': file.type
	      };
	      // Push to child path.
	      // [START oncomplete]

	      storageRef.child('user/'+$scope.slangoUser.uid+'/' + file.name).put(file, metadata).then(function(snapshot) {
	        //console.log('Uploaded', snapshot.totalBytes, 'bytes.');
	        vm.determinateValue = snapshot.totalBytes;
	        //console.log(snapshot.metadata);
	        var url = snapshot.metadata.downloadURLs[0];
	        

	        document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Profile Image available at this link</a>';
	        vm.userUrlImg = url;
	        
	       /*TODO: Delete Other Photos */
			/*var photoDurl = $scope.firebaseUser.photoURL;
			var urlTo = snapshot.metadata.downloadURLs[1];
			var urlToDel = urlTo.split('?')[0].split('%2F')[2];
			if(photoDurl !== null){
			
	        
	        console.log(url);
	        console.log(urlToDel);
			var delRef = storageRef.child('user/'+$scope.firebaseUser.uid+'/'+urlToDel+'');
			delRef.delete().then(function() {
			  // File deleted successfully
			  console.log('deleted');
			}).catch(function(error) {
			  // Uh-oh, an error occurred!
			});
	        // [END_EXCLUDE]
	        }*/
	        firebaseService.updateUserTable($scope.slangoUser.uid, snapshot.metadata.downloadURLs[0]);
	        $scope.slangoUser.updateProfile({
	          photoURL: snapshot.metadata.downloadURLs[0]  
	        });
        

	      }).catch(function(error) {
	        // [START onfailure]
	        console.error('Upload failed:', error);
	        $scope.error = 'Upload failed:', error;
	        // [END onfailure]
	      });
	      // [END oncomplete]
	    }
	    $scope.handleFileSelect();
	});
	}
});

});

