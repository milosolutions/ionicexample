angular.module('Communication', []).service('RequestData', function ($http , $q) {

  // base url ; might be also stored as Value or Service with rest statics
  this.baseUrl = 'http://milosolutions.com/';

  // load data ::
  this.stored = [];
  var proxy = this;

  /*
    query for items , preparsing
   */
  this.getData = function () {
    var def = $q.defer();
    if(this.stored && this.stored.length != 0){
      def.resolve(this.stored);
    } else {
      $http.get('testdata.json').then(function (result) {
          proxy.stored = result.data;
          proxy.stored.reverse();
          def.resolve(result.data);

      }, function (error) {
        console.log('could not load data :',error);
        def.reject([]);
      });
    }
    return def.promise;
  };

  /*
    find item by id
    @param  id:[String | Number]  item ID
   */
  this.getById = function (id) {
    for(var i = 0 ; i<this.stored.length ; i++){
      if(this.stored[i].id == id){
        return this.stored[i];
      }
    }
    // not found ::
    return null;
  };

  /*
   saving data ::
   @param obj:{title:String;body:String}  new item
    */
  this.sendData = function (obj) {
    return $http.post(this.baseUrl + 'posts',obj);
  };

  /*
    Add item localy ::
    @param  item:{title:String;body:String;id:Number}
   */
  this.addItem = function (item) {
    this.stored.unshift(item);
  }
});
