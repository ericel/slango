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
   var addToSlangs = [];
   var addToComments = [];
   var _this = this;
   firebaseService.getSlangs().on('value', function(response) {
      _this.slangs = response.val();
      var userSlangs = _this.slangs;
      for (var key in userSlangs) {
        if (userSlangs.hasOwnProperty(key)) {
           var slang = {"slang": userSlangs[key].slang, "slangDefine": userSlangs[key].slangDefine, "slangExample": userSlangs[key].slangExample, "user_id": userSlangs[key].user_id, "time_date": userSlangs[key].time_date, "file_dislikes": userSlangs[key].file_dislikes, "file_likes": userSlangs[key].file_likes, "slangID": userSlangs[key].slangID};
        addToSlangs.push(slang);
        }
      }
      if((objects.length) !== (Object.keys(_this.slangs).length)){
        
        $indexedDB.openStore('userSlangs', function(store){
          store.upsert(addToSlangs).then(function(e){
            // do something
          });
        });
      
      }
    });
  this.getVobj = function(){ 

    var deferred = $q.defer();

    if(_this.vObjects){
       deferred.resolve(_this.vObjects);
     } else {

		$indexedDB.openStore('userSlangs', function(store){
		       store.getAll().then(function(userSlangs) { 
		        objects = userSlangs;
		        _this.vObjects = objects;
		       deferred.resolve(objects);
		        });
		    });
		}

		   return deferred.promise;

	};

  firebaseService.getSlangComments().on('value', function(response) {
      _this.comments = response.val();
      var slangComments = _this.comments;
      for (var key in slangComments) {
        if (slangComments.hasOwnProperty(key)) {
           var comment = {"comment": slangComments[key].comment, "commentID": slangComments[key].commentID, "slangID": slangComments[key].slangID, "user_id": slangComments[key].user_id, "time_date": slangComments[key].time_date, "username": slangComments[key].username};
        addToComments.push(comment);
        }

      }

      if((objects.length) !== (Object.keys(_this.comments).length)){
        
        $indexedDB.openStore('slangComments', function(store){
          store.upsert(addToComments).then(function(e){
            // do something
          });
        });
      
      }
      
      if(Object.keys(_this.comments).length < 1){
         $indexedDB.openStore('slangComments', function(store){
            store.clear().then(function(){
              // do something
            });
          });
      }
    });
   this.getVobjComments = function(){ 

    var deferred = $q.defer();

    if(_this.vObjects){
       deferred.resolve(_this.vObjects);
     } else {

    $indexedDB.openStore('slangComments', function(store){
           store.getAll().then(function(slangComments) { 
            objects = slangComments;
            _this.vObjects = objects;
           deferred.resolve(objects);
            });
        });
    }

       return deferred.promise;

  };

  });
