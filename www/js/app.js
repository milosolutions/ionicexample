angular.module('MiloDemo', ['ionic','Communication']).run(function($ionicPlatform) {
  /*
    preinit actions
   */
}).config(function($stateProvider, $urlRouterProvider) {

  /*
    states config
   */
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/main.html'
  })
  .state('app.list', {
    url: '/list',
    views: {
      'app-list': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('app.add', {
    url: '/item/',
    views: {
      'app-add': {
        templateUrl: 'templates/add.html',
        controller: 'EditCtrl'
      }
    }
  })
  .state('app.view', {
      url: '/view/:id',
      views: {
        'app-view': {
          templateUrl: 'templates/view.html',
          controller: 'ViewCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/app/list');

  /* ... */
});
