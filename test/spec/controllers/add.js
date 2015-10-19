'use strict';

describe('Controller: AddCtrl', function () {
  beforeEach(module('MiloDemo'));
  var MainCtrl, EditCtrl, MainScope, EditScope, rootScope, $httpBackend, requestData;


  var exampleItem = {id:102,title:'test title',body:'test body'};


  beforeEach(inject(function ($controller, $rootScope, $injector, RequestData) {

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET(/\.html$/).respond(200);
    $httpBackend.whenPOST(RequestData.baseUrl + 'posts').respond(200, exampleItem);


    requestData = RequestData;
    rootScope = $rootScope;
    MainScope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: MainScope
    });
    EditScope = MainScope.$new();
    EditCtrl = $controller('EditCtrl', {
      $scope: EditScope
    });
  }));


  it('should add item', function (done) {
    EditScope.itemTitle = 'title';
    EditScope.itemBody = 'body';


    MainScope.$on(ApplicationEvents.SAVE_ITEM, function (e,item) {
      expect(item.title).toBe(EditScope.itemTitle);
      expect(item.body).toBe(EditScope.itemBody);
      setTimeout(function () {// call in next stack
        expect(MainScope.userAdded).toBe(true);
        expect(requestData.getById(102).id).toBe(exampleItem.id);
        done();
      },0);

    });

    $httpBackend.expectPOST(requestData.baseUrl + 'posts');
    EditScope.save();
    $httpBackend.flush();


  });

});
