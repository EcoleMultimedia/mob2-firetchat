angular
  .module('Firetchat', ['ui.router', 'firebase'])
  .constant('FIREBASE_REFERENCE', new Firebase('https://radiant-heat-2931.firebaseio.com'))
  .config(function($urlRouterProvider, $stateProvider) {

    // $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'home',
        params: {
          private: false
        }
      })
      .state('tchat', {
        url: '/tchat',
        templateUrl: 'views/tchat.html',
        controller: 'TchatController',
        controllerAs: 'tchat',
        params: {
          private: true
        }
      })

  })
  .run(function($rootScope, $state, AuthFactory, $timeout, $http) {

    $rootScope.userData = null;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      console.log('$state.go("'+toState.name+'")')
      // Si l'utilisateur tente d'accèder à /tchat sans qu'il soit connecté, on le jarte...
      if (toParams.private && $rootScope.userData === null) {
        event.preventDefault();
        console.warn('Accès interdit à ', toState, 'Redirection ...')
        $state.go('home');
      }
    });

    // Tentative de reconnexion avec firebase
    var authData = AuthFactory.$getAuth();
    if (authData) {
      $rootScope.userData = authData.google;
      $state.go('tchat');
    } else {
      $state.go('home');
    }

    // Méthode pour la déconnexion
    $rootScope.logout = function() {
      AuthFactory.$unauth();
      $rootScope.userData = null;
      $state.go('home');
    }

  })
  .factory('AuthFactory', function(FIREBASE_REFERENCE, $firebaseAuth) {
    return $firebaseAuth(FIREBASE_REFERENCE);
  })
  .factory('MessageFactory', function(FIREBASE_REFERENCE, $firebaseArray) {
    return $firebaseArray(FIREBASE_REFERENCE.child('tchat'));
  })