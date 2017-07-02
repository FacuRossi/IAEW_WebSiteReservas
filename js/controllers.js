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
	$scope.clientSelected;
	$scope.paisSelected;
	$scope.vehiculosSelected;
	$scope.precioBase;
	function cargarClientes(){
		return vehiculosSvc.getClientes().then(function(clientes){
			$scope.clientes =clientes;
		});
	};
	function cargarPaises(){
		return vehiculosSvc.getPaises().then(function(paises){
			$scope.paises =paises;
		});
	};
	$scope.cargarCiudades = function(){
		return vehiculosSvc.getCiudades($scope.paisSelected).then(function(ciudades){
			$scope.ciudades =ciudades;
		});
	};
	$scope.cargarVehiculos = function(){
		var ciudadSelect = document.getElementById('ciudadSelect');
		var indiceSeleccionado = ciudadSelect.selectedIndex;
		$scope.ciudad = ciudadSelect.options[indiceSeleccionado].value;
		return vehiculosSvc.getVehiculos($scope.ciudad).then(function(vehiculos){
			$scope.vehiculos =vehiculos;
		});
	};
	$scope.getPrecioVenta = function(){
		$scope.precioBase = parseInt(document.getElementById('precioBase').value)
		$scope.precioVenta = $scope.precioBase * 1.2
		console.log($scope.precioBase);
		console.log($scope.precioVenta);
		return  $scope.precioVenta;
	}
	cargarClientes();
	cargarPaises();
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
