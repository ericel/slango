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

    this.isLoggedIn = function(){
      	return firebaseAuthObject;
    };

    this.signOutUser = function() {
      //partyService.reset();
      firebaseAuthObject.$signOut();
    };
    
  /* var presenceRef = firebase.database().ref("disconnectmessage");
  // Write a string when this client loses connection
   presenceRef.onDisconnect().set("I disconnected!");

       var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});*/
   
 }]);

