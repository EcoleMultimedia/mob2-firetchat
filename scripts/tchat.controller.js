angular
  .module('Firetchat')
  .controller('TchatController', function(MessageFactory, $rootScope, $filter, $http) {

    var tchat = this;

    //Géolocalisation
    if (!navigator.geolocation){
      return
    }else{
      navigator.geolocation.getCurrentPosition(success, error);
    }

    tchat.messagesList = MessageFactory;

    tchat.sendMessage = function() {

      tchat.currentDate = Date.now();
      
      tchat.messagesList.$add({
        idUser: $rootScope.userData.id,
        picture: $rootScope.userData.profileImageURL,
        from: $rootScope.userData.displayName,
        text: tchat.messageText,
        date: tchat.currentDate,
        lieu: tchat.address
      });

      tchat.messageText = '';
    }

    tchat.remove = function(item) {
      if($rootScope.userData.id === item.idUser && confirm("Veux-tu vraiment supprimer ton message ?")) {
        console.log("Message supprimé : ", item);
        tchat.messagesList.$remove(item);
      }
    }

    function success(position) {
      
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      $http
        .get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude + ',' + longitude + '&sensor=true')
        .success(function(data) {
            tchat.address = data.results[5].address_components[0].short_name;
        })
    };

    function error() {
      tchat.address = 'undefined';
      console.log("Nan mais sois gentil stp et donne moi ta position please ;)");
    };

  })