angular
  .module('Firetchat')
  .controller('TchatController', function(MessageFactory, $rootScope) {
    var tchat = this;

    tchat.messagesList = MessageFactory;

    tchat.sendMessage = function() {
      tchat.messagesList.$add({
        from: $rootScope.userData.displayName,
        text: tchat.messageText
      });
      tchat.messageText = '';
    }
  })