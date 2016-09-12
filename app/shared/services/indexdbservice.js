'use strict';

/**
 * @ngdoc service
 * @name slangoApp.indexDBService
 * @description
 * # indexDBService
 * Service in the slangoApp.
 */
angular.module('slangoApp')
  .service('indexDBService', function ($indexedDB, firebaseService, $q) {
   var objects = [];
   var addToVideos = [];
   var _this = this;

   firebaseService.getvideosApi().then(function(response){
      _this.videos = response.data;
      var userVideos = _this.videos;
      for (var key in userVideos) {
        if (userVideos.hasOwnProperty(key)) {
           var video = {"file_id": userVideos[key].file_id, "filename": userVideos[key].filename, "file_status": userVideos[key].file_status, "user_id": userVideos[key].user_id, "video_avatar": userVideos[key].video_avatar, "upload_date": userVideos[key].upload_date, "file_dislikes": userVideos[key].file_dislikes, "file_likes": userVideos[key].file_likes, "downloadUrl": userVideos[key].downloadUrl}
        addToVideos.push(video);
        }
      }
      if((objects.length) < (Object.keys(_this.videos).length)){
        
        $indexedDB.openStore('userVideos', function(store){
          store.upsert(addToVideos).then(function(e){
            // do something
          });
        });
      
      }
    });
  this.getVobj = function(){ 

    var deferred = $q.defer()

    if(_this.vObjects){
       deferred.resolve(_this.vObjects);
     } else {

		$indexedDB.openStore('userVideos', function(store){
		       store.getAll().then(function(userVideos) { 
		        objects = userVideos;
		        _this.vObjects = objects;
		       deferred.resolve(objects);
		        });
		    });
		}

		   return deferred.promise;

	};

  

  });
