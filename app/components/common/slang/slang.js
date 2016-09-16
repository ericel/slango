'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:SlangCtrl
 * @description
 * # SlangCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('SlangCtrl', function ($scope,  authService, md5, $timeout, firebaseService, currentAuth,  $location, $stateParams, $log, $interval, indexDBService) {
  	var vm = this;
  	vm.sid = $stateParams.sid;
  	vm.title = $stateParams.title.replace(/\-+/g, ' ');
    $scope.$parent.seo = {
        pageTitle : vm.title,
        pageDescripton: vm.title
    };
    if (navigator.onLine) {
       firebaseService.getSlangs().on('value', function(response) {
           vm.slangs = response.val(); 
            vm.defined = vm.slangs[vm.sid].slangDefine;
            vm.slangEx = vm.slangs[vm.sid].slangExample;
            vm.likesSlang = vm.slangs[vm.sid].file_likes;
            vm.dislikesSlang = vm.slangs[vm.sid].file_dislikes;
            vm.date_added = vm.slangs[vm.sid].time_date;
            vm.uid= vm.slangs[vm.sid].user_id;
            firebaseService.getUser(vm.uid).on('value', function(snapshot) {
            vm.username = snapshot.val().username;
            vm.userUrlImg = snapshot.val().profile_picture;
           });
        });
    } else {
   indexDBService.getVobj().then(function(vObj){
      vm.slangs = vObj;

      var filtered =  vm.slangs.filter(function(item) {
        return item.slangID === vm.sid;
      });

        vm.defined = filtered[0].slangDefine;
        vm.slangEx = filtered[0].slangExample;
        vm.likesSlang = filtered[0].file_likes;
        vm.dislikesSlang = filtered[0].file_dislikes;
        vm.date_added = filtered[0].time_date;
        vm.uid= filtered[0].user_id;
        firebaseService.getUser(vm.uid).on('value', function(snapshot) {
         vm.username = snapshot.val().username;
         vm.userUrlImg = snapshot.val().profile_picture;
      });
 
  });
 }
vm.comments ='';
$scope.loadComments = function(){
  if (navigator.onLine) {
    firebaseService.getSlangComments().on('value', function(response) {
      vm.comments = response.val();
      var result = [];
      for(var key in vm.comments){
          if(vm.comments[key].slangID == vm.sid)
              result.push(vm.comments[key]);
      }
       vm.comments = result;
    });
  } else {
    indexDBService.getVobjComments().then(function(vObjv){
      vm.comments = vObjv;
      
      var filtered =  vm.comments.filter(function(item) {
        return item.slangID === vm.sid;
      });
      vm.comments = filtered;
  
    });
  }
}

$scope.loadComments();



vm.getDatetime = new Date().toJSON();

vm.hideSuccess = false;
  vm.auth = authService.isLoggedIn();
  vm.auth.$onAuthStateChanged(function(user) {
          $scope.slangoUser = user;
          vm.currentUID = user.uid;
          vm.currentUsername = user.displayName;
          vm.commentID = md5.createHash('comment'+vm.getDatetime+$scope.slangoUser);

        $scope.createComment = function(){
         if($scope.form.$invalid){
          $scope.error = "Make sure you fill all form fields!";
          return;
          }
          firebaseService.addComment(vm.commentID, vm.sid, vm.currentUID, vm.currentUsername, $scope.comment, vm.getDatetime).then(function(){
              
            // Reset the form model.
            $scope.comment = '';
            $scope.form.$setPristine();
            $scope.form.$setUntouched();
            vm.hideSuccess = true;
            vm.message = "Comment Added Successfully!";
             $scope.loadComments();
             $timeout(function(){
              vm.hideSuccess = false;
             }, 3000);
          });

      };  
 });
  $scope.upVote = function(){
    if(currentAuth){
      vm.upvotes = vm.likesSlang + 1;
      firebaseService.upVote(vm.sid, vm.upvotes).then(function(){
        $scope.success = "Thanks for voting! Vote as many times as you want.";
      });
    } else {
      $scope.alert = "You Need To Login To Vote!";
    }
    
  };
  $scope.upDown = function(){
    if(currentAuth){
     vm.downvotes = vm.dislikesSlang + 1;
     firebaseService.downVote(vm.sid, vm.downvotes).then(function(){
        $scope.success = "Thanks for voting! Vote as many times as you want.";
      });
    } else {
      $scope.alert = "You Need To Login To Vote!";
    }

  };
});
