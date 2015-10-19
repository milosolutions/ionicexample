/*
application controller
*/
angular.module('MiloDemo')
.controller('MainCtrl', function ($scope, $state, RequestData) {
  /*
      Application events handling ::
   */
  $scope.$on(ApplicationEvents.SAVE_ITEM, function (e,data) {
    $scope.userAdded = true;
    RequestData.sendData(data).then(function (result) {
      // valid request , add item ::
      RequestData.addItem(result.data);
    });
  });

  $scope.$on(ApplicationEvents.SELECT_ITEM , function (e , id) {
    $state.go('app.view',{id:id});
  });


})
/*
  List controller
  list:{title:String;body:String;id:Number;userId:Number}[]
*/
.controller('ListCtrl', function ($scope, RequestData ) {
  /*
    functions ::
  */
  $scope.applyItems = function (items) {
    $scope.list = items;
  };

  $scope.select = function (id) {
    $scope.$emit(ApplicationEvents.SELECT_ITEM,id);
  };

  /*
    ctrl init ::
  */
  RequestData.getData().then(function (data) {
    $scope.applyItems(data);
  }, function (data) {
    $scope.applyItems(data);
  })

})


/*
save item controller
*/
.controller('EditCtrl', function ($scope, $state) {
  $scope.save = function () {
    // data verification
    /* TODO */
    // emit save event
    $scope.$emit(ApplicationEvents.SAVE_ITEM,{body:$scope.itemBody,title:$scope.itemTitle});
    $scope.itemBody = '';
    $scope.itemTitle = '';
    // back to list state
    $state.go('app.list');
  }
})


/*
display item controller
 */
.controller('ViewCtrl', function ($scope, $stateParams, RequestData) {
    /*
      functions
     */
    $scope.getItem = function () {
      $scope.item = RequestData.getById($stateParams.id);
    };

    /*
      init
     */
    $scope.getItem();
    if($scope.item == null){
      RequestData.getData().then(function () {
        $scope.getItem();
        if($scope.item == undefined){
          $scope.item = {title:'Error',body:'Item not found',id:404};
        }
      })
    }
});
