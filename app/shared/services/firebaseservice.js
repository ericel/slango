'use strict';

/**
 * @ngdoc service
 * @name slangoApp.firebaseService
 * @description
 * # firebaseService
 * Service in the slangoApp.
 */
angular.module('slangoApp')
  .service('firebaseService', function ($http, CacheFactory) {
  	var videosCache;
      // Check to make sure the cache doesn't already exist
	if (!CacheFactory.get('videosCache')) {
	  videosCache = CacheFactory('videosCache');
	}
    
    videosCache.put('/profiles/34', {
	    name: 'John',
	    skills: ['programming', 'piano']
    });
    
  	this.getvideosApi = function() {
  	  
        return $http.get('https://gotube-a0034.firebaseio.com/user-videos.json', {  cache: true });
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
	 return firebase.database().ref('/users/' +uid).once('value');
	}

	/*this.getVideo = function(vid){
	 return firebase.database().ref('/user-videos/' +uid).once('value');
	}*/

	this.addVideo = function(mdfile, filename, video_avatar, filetypeshow, uid, downloadURL, getDatetime){
		 firebase.database().ref('user-videos/' + mdfile).set({
		    file_id: mdfile,
		    filename: filename,
		    video_avatar: video_avatar,
		    file_status: filetypeshow,
		    file_likes: 0,
		    file_dislikes: 0,
		    user_id: uid,
		    downloadUrl : downloadURL,
		    upload_date : getDatetime
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
