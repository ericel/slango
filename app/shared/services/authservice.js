'use strict';

/**
 * @ngdoc service
 * @name slangoApp.authService
 * @description
 * # authService
 * Service in the slangoApp.
 */
angular.module('slangoApp')
  .service('authService', ["$firebaseAuth", function($firebaseAuth) {
  	var firebaseAuthObject  = $firebaseAuth();

    this.login = function(loginEmail, loginPassword){
       
       return firebaseAuthObject.$signInWithEmailAndPassword(loginEmail, loginPassword);
    };
   
    this.createUser = function(email, password) {
    	return firebaseAuthObject.$createUserWithEmailAndPassword(email, password);
    };
    
    this.resetPass = function(email){
      return firebaseAuthObject.$sendPasswordResetEmail(email);
    };

    this.isLoggedIn = function(){
      	return firebaseAuthObject;
    };

    this.signOutUser = function() {
      //partyService.reset();
      firebaseAuthObject.$signOut();
    };
    
   
 }]);

