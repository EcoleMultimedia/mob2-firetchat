angular
  .module('Firetchat')
  .controller('TchatController', function(MessageFactory, $rootScope) {
    var tchat = this;

    tchat.messagesList = MessageFactory;

    tchat.sendMessage = function() {
      tchat.messagesList.$add({
        idUser: $rootScope.userData.id,
        picture: $rootScope.userData.profileImageURL,
        from: $rootScope.userData.displayName,
        text: tchat.messageText
      });
      tchat.messageText = '';
    }

    tchat.remove = function(item) {
      if($rootScope.userData.id === item.idUser && confirm("Veux-tu vraiment supprimer ton message ?")) {
        console.log("Message supprimé : ", item);
        tchat.messagesList.$remove(item);
      }
    }
  })