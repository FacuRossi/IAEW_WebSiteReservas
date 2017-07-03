angular.module('webSiteReservasApp', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
            // route for the home page
            .when('/', {
            	templateUrl : 'templates/home.html',
            	controller  : 'mainCtrl'
            })

            // route for the about page
            .when('/reservas', {
            	templateUrl : 'templates/reservas.html',
            	controller  : 'reservasCtrl'
            })

            // route for the contact page
            .when('/vehiculos', {
            	templateUrl : 'templates/vehiculos.html',
            	controller  : 'vehiculosCtrl'
            })
            .when('/newReserva/:id/:modelo/:marca/:precioBase', {
                  templateUrl : 'templates/newReserva.html',
                  controller  : 'newReservaCtrl'
            });
        });