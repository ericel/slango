'use strict';

/**
 * @ngdoc service
 * @name slangoApp.firebaseService
 * @description
 * # firebaseService
 * Service in the slangoApp.
 */
angular.module('slangoApp')
  .service('firebaseService', function ($http) {

    
  	this.getSlangs = function() {
  	  
       return $http.get('https://slango-70929.firebaseio.com/s-slango.json', {  cache: true });
    };

    
	 this.writeUserData = function(userId, name, email, imageUrl, country, getDatetime) {

		  firebase.database().ref('users/' + userId).set({
		    username: name,
		    email: email,
		    profile_picture : imageUrl,
		    country : country,
		    sign_date : getDatetime
		  });
	}

	this.updateUserTable = function(userId, photoUrl){
          firebase.database().ref('users/' + userId).update({

		    profile_picture : photoUrl
		   
		  });
	}

	this.getUser = function(uid){
	 return firebase.database().ref('/users/'+uid).once('value');
	 //return $http.get('https://slango-70929.firebaseio.com/users/'+uid+'.json', {  cache: true });
	}

	/*this.getVideo = function(vid){
	 return firebase.database().ref('/user-videos/' +uid).once('value');
	}*/

	this.addSlang = function(sID, slang, slangDefine, slangExample, uid, getDatetime){
		 firebase.database().ref('s-slango/' + sID).set({
		 	slangID: sID,
		    slang: slang,
		    slangDefine: slangDefine,
		    slangExample: slangExample,
		    file_likes: 0,
		    file_dislikes: 0,
		    user_id: uid,
		    time_date : getDatetime
		  });
	}

	this.getRecentVideos = function(){
	    return   firebase.database().ref('user-videos');
	    // firebase.database().ref('user-videos').keepSynced(true);
    };

  //var presenceRef = firebase.database().ref("disconnectmessage");
	// Write a string when this client loses connection
 //presenceRef.onDisconnect().set("I disconnected! for real really");

 /*var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});*/
});
