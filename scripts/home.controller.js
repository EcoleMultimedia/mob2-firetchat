angular
  .module('Firetchat')
  .controller('HomeController', function($rootScope, AuthFactory, $state) {
    var home = this;

    home.signWithGoogle = function() {
      AuthFactory
        .$authWithOAuthPopup('google')
        .then(function (authData) {
          console.info('Connexion réussie !', authData);
          $rootScope.userData = authData.google;
          $state.go('tchat')
        })
        .catch(function(error) {
          console.error('Problème à l\'authentification...', error)
        })
    }
  })