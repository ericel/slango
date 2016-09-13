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
   var _this = this;

   firebaseService.getSlangs().then(function(response){
      _this.slangs = response.data;
      var userSlangs = _this.slangs;
      for (var key in userSlangs) {
        if (userSlangs.hasOwnProperty(key)) {
           var slang = {"slang": userSlangs[key].slang, "slangDefine": userSlangs[key].slangDefine, "slangExample": userSlangs[key].slangExample, "user_id": userSlangs[key].user_id, "time_date": userSlangs[key].time_date, "file_dislikes": userSlangs[key].file_dislikes, "file_likes": userSlangs[key].file_likes}
        addToSlangs.push(slang);
        }
      }
      if((objects.length) < (Object.keys(_this.slangs).length)){
        
        $indexedDB.openStore('userSlangs', function(store){
          store.upsert(addToSlangs).then(function(e){
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

  

  });
