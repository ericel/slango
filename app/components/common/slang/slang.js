'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:SlangCtrl
 * @description
 * # SlangCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('SlangCtrl', function ($scope,  $sce, $timeout, firebaseService, currentAuth, indexDBService, $location, $stateParams, $log) {
  	var vm = this;
  	vm.sid = $stateParams.sid;
  	vm.title = $stateParams.title.replace(/\-+/g, ' ');
    $scope.$parent.seo = {
        pageTitle : vm.title,
        pageDescripton: vm.title
    };
    indexDBService.getVobj().then(function(vObj){
      vm.slangs = vObj;
      /*if(vm.slangs.length === 0) {
        firebaseService.getSlangs().then(function(response) {
           vm.slangs = response.data; 
           var filtered =  vm.slangs[vm.sid];  
           vm.defined = filtered.slangDefine;
           vm.slangEx = filtered.slangExample;
           vm.likesSlang = filtered.file_likes;
           vm.dislikesSlang = filtered.file_dislikes;
           vm.date_added = filtered.time_date;
           vm.uid= filtered.user_id;
        });
      } else {*/
      console.log(vm.slangs);
      var filtered =  vm.slangs.filter(function(item) {
        return item.slangID === vm.sid;
      });
      console.log(filtered);
      

        vm.defined = filtered[0].slangDefine;
        vm.slangEx = filtered[0].slangExample;
        vm.likesSlang = filtered[0].file_likes;
        vm.dislikesSlang = filtered[0].file_dislikes;
        vm.date_added = filtered[0].time_date;
        vm.uid= filtered[0].user_id;
      //}
     
     firebaseService.getUser(vm.uid).then( function(snapshot){
         vm.username = snapshot.val().username;
         vm.userUrlImg = snapshot.val().profile_picture;
         vm.country  = snapshot.val().country;
         vm.signupdate = snapshot.val().sign_date;
         $scope.$apply();
      })

  });
  });
