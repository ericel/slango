'use strict';

/**
 * @ngdoc service
 * @name slangoApp.firebaseService
 * @description
 * # firebaseService
 * Service in the slangoApp.
 */
angular.module('slangoApp')
  .service('firebaseService', function ($http, offline, $firebase) {
    
	 this.writeUserData = function(userId, name, email, imageUrl, country, getDatetime) {

		  firebase.database().ref('sl-users/' + userId).set({
		  	user_id: userId,
		    username: name,
		    email: email,
		    profile_picture : imageUrl,
		    country : country,
		    sign_date : getDatetime
		  });
	}

	this.updateUserTable = function(userId, photoUrl){
          firebase.database().ref('sl-users/' + userId).update({

		    profile_picture : photoUrl
		   
		  });
	}

	this.getUser = function(uid){
	 return firebase.database().ref('/sl-users/'+uid);
	}
    
   

	this.addSlang = function(sID, slang, slangDefine, slangExample, uid, getDatetime){
		return firebase.database().ref('s-slango/' + sID).set({
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
	this.addComment = function(commentID, slangID, uid, username, comment, getDatetime){
		return firebase.database().ref('s-slango-comments/' + commentID).set({
		 	commentID: commentID,
		    slangID: slangID,
		    user_id: uid,
		    username: username,
		    comment: comment,
		    time_date : getDatetime
		  });
	}
    this.getSlangs = function() {
  	  
       return firebase.database().ref('/s-slango');
    };
	this.getSlangComments = function() {
  	  
       return firebase.database().ref('/s-slango-comments');
    };
    
    this.upVote = function(slangID, votes){
		return firebase.database().ref('s-slango/' + slangID).update({
		    file_likes: votes
		  });
	}
	this.downVote = function(slangID, votes){
		return firebase.database().ref('s-slango/' + slangID).update({
		    file_dislikes: votes
		  });
	}


});
