angular.module('webSiteReservasApp')
.service('vehiculosSvc', function($q, $http) {
	var baseUrlGetVehiculos = 'http://localhost:8090/clientes';
	this.getVehiculos = function() {
		return $http.get(baseUrlGetVehiculos).then(function(respuesta) {
			return respuesta.data;
		});
	};
})
.service('reservasSvc', function($q, $http) {
	var baseUrlGetReservas = 'http://localhost:8090/reservas';
	this.getReservas = function() {
		return $http.get(baseUrlGetReservas).then(function(respuesta) {
			return respuesta.data;
		});
	};
	var baseUrlGetClientes = 'http://localhost:8090/clientes';
	this.getClientes = function() {
		return $http.get(baseUrlGetClientes).then(function(respuesta) {
			return respuesta.data;
		});
	};
	var baseUrlGetVendedores = 'http://localhost:8090/vendedores';
	this.getVendedores = function() {
		return $http.get(baseUrlGetVendedores).then(function(respuesta) {
			return respuesta.data;
		});
	};
});