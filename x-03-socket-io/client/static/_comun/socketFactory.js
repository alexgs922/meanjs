(function () {
    angular.module('controlCajaApp').factory('socketFactory', function ($rootScope) {
        var socket;
        return {
            connect: function(){
				socket= io.connect();
                console.log("IO: connected" );
            },
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    console.log("IN: " + eventName + " : " + JSON.stringify(args));
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data) {
                console.log("OUT: " + eventName + " : " + JSON.stringify(data));
				socket.emit(eventName, data);
            }
        }
    });
}());
