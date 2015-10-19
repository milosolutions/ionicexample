'use strict';

describe('Controller: ListCtrl', function () {
  beforeEach(module('MiloDemo'));
  var ListCtrl,scope,rootScope,$httpBackend;


  var exampleItems = [];
  for(var i = 0 ; i< 5;i++){
    exampleItems.push({userId:i,id:i,title:'test',body:'text'});
  }


  beforeEach(inject(function ($controller, $rootScope, $injector, RequestData) {

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('testdata.json').respond(exampleItems);
    $httpBackend.whenGET(/\.html$/).respond(200);

    rootScope = $rootScope;
    scope = $rootScope.$new();
    ListCtrl = $controller('ListCtrl', {
      $scope: scope
    });

    $httpBackend.flush();
  }));




  it('should attach a list of items to the scope', function () {
    expect(scope.list.length).toBe(5);
  });

  it('should select item with id 1', function (done) {
    rootScope.$on(ApplicationEvents.SELECT_ITEM, function (e,item) {
      expect(item.id).toBe(1);
      done();
    });
    scope.select(exampleItems[1]);
  });

});
