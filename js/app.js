angular.module('webSiteReservasApp', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
            .when('/', {
            	templateUrl : 'templates/home.html',
            	controller  : 'mainCtrl'
            })
            .when('/reservas', {
            	templateUrl : 'templates/reservas.html',
            	controller  : 'reservasCtrl'
            })
            .when('/vehiculos', {
            	templateUrl : 'templates/vehiculos.html',
            	controller  : 'vehiculosCtrl'
            })
            .when('/newReserva/:id/:modelo/:marca/:precioBase', {
                  templateUrl : 'templates/newReserva.html',
                  controller  : 'newReservaCtrl'
            });
        });