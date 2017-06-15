angular.module('webSiteReservasApp')
.controller('mainCtrl', function($scope) {
	$scope.message = 'El mejor sitio para reservas online!';
})

.controller('reservasCtrl', function($scope, reservasSvc) {
	function cargarReservas(){
		return reservasSvc.getReservas().then(function(reservas){
			$scope.reservas =reservas;
		});
	};
	cargarReservas();
})

.controller('vehiculosCtrl', function($scope, vehiculosSvc) {
	function cargarVehiculos(){
		return vehiculosSvc.getVehiculos().then(function(vehiculos){
			$scope.vehiculos =vehiculos;
		});
	};;
	cargarVehiculos();
})

.controller('newReservaCtrl', function($scope, reservasSvc) {
	function cargarVendedores(){
		return reservasSvc.getVendedores().then(function(vendedores){
			$scope.vendedores =vendedores;
		});
	};
	function cargarClientes(){
		return reservasSvc.getClientes().then(function(clientes){
			$scope.clientes =clientes;
		});
	};
	cargarClientes();
	cargarVendedores();
});
