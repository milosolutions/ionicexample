/*
application controller
*/
angular.module('MiloDemo')
.controller('MainCtrl', function ($scope, $state, RequestData) {

      $state.go('app.video');return;
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
}).controller('WebRtcCtrl', function ($scope) {console.log('started:',$scope);
      // just for test :!



      //global state variables
      var myEasyrtcId; //id of client in the signaling framework

      //global functions
      var connectSuccess = function(easyrtcid) { //join room as defined by "room" parameter in URL
        myEasyrtcId = easyrtcid;
        console.log('Connect successful. My id is ' + myEasyrtcId + '.');
        var room = decodeURIComponent((new RegExp('[?|&]room=' + '([^&;]+?)(&|#|;|$)'). //retrieve room name from URL
                exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        console.log('join room: ' + room);
        room = room || 'mymeeting';
        easyrtc.joinRoom(room, null, joinSuccess, failureCallback);
      };

      var failureCallback = function(errorCode, errorMsg) { //log error
        console.log(errorCode);
        console.log(errorMsg);
      };

      var joinSuccess = function(roomName) { //listen for peers joining the room
        setTimeout(function() {
          console.log('successfully joined room: ' + roomName);
          var peers = easyrtc.getRoomOccupantsAsArray(roomName) || []; //get list of client connected to room
          console.log('peers: ' + peers);
          var peersLength = peers.length;
          if (peersLength > 2) { //support only 1-1 video conferences
            alert('The meeting room is already full. ' +
                'Only the two peers connecting first will be allowed access.');
          } else if(peersLength === 1) { //if no other peer is connected
            console.log('waiting for peer to connect...');
          } else if(peers[0] != myEasyrtcId) {//get peer id
            easyrtc.call(peers[0]);
          } else {
            easyrtc.call(peers[1]);
          }
        }, 100);
      };


      easyrtc.setVideoDims(640, 480);
      easyrtc.easyApp('vcdemo', 'self', ['peer'], connectSuccess, failureCallback); //connect to easyrtc app; initiate media sources and elements
      easyrtc.setSocketUrl('80.51.119.182:8450');

    });
