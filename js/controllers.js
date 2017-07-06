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

	$scope.cancelarReserva = function (codigoDeReserva){
		reservasSvc.cancelarReserva(codigoDeReserva);
		cargarReservas();
		window.location.reload()
	}
	cargarReservas();
})

.controller('vehiculosCtrl', function($scope, vehiculosSvc) {
	$scope.clientSelected;
	$scope.paisSelected;
	$scope.vehiculosSelected;
	$scope.precioBase;

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
		return  $scope.precioVenta;
	}
	cargarPaises();
})

.controller('newReservaCtrl', function($scope, $routeParams, reservasSvc) {
	$scope.idReserva = $routeParams.id;
	$scope.modelo = $routeParams.modelo;
	$scope.marca = $routeParams.marca;
	$scope.precioBase = parseInt($routeParams.precioBase);
	$scope.precioVenta = $scope.precioBase * 1.2;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	$scope.fecha = dd+'/'+mm+'/'+yyyy;

	function cargarClientes(){
		return reservasSvc.getClientes().then(function(clientes){
			$scope.clientes =clientes;
		});
	};
	function cargarVendedores(){
		return reservasSvc.getVendedores().then(function(vendedores){
			$scope.vendedores =vendedores;
		});
	};

	$scope.registrarReserva = function(){
		var clienteSelect = document.getElementById('clienteSelect');
		var indiceSeleccionado = clienteSelect.selectedIndex;
		$scope.cliente = clienteSelect.options[indiceSeleccionado].value;
		var vendedorSelect = document.getElementById('vendedorSelect');
		var indSeleccionado = vendedorSelect.selectedIndex;
		$scope.vendedor = vendedorSelect.options[indSeleccionado].value;
		reservasSvc.registrarReserva($scope.idReserva,$scope.precioBase,$scope.precioVenta,$scope.cliente,$scope.vendedor);
	}

	cargarClientes();
	cargarVendedores();
});
