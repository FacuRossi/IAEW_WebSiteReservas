angular.module('webSiteReservasApp')

.service('vehiculosSvc', function($q, $http) {
	var baseUrlGetClientes = 'http://localhost:8090/clientes';
	var baseUrlGetPaises = 'http://localhost:8090/paises';
	var baseUrlGetCiudades = 'http://localhost:8090/ciudades/';
	var baseUrlGetVehiculos = 'http://localhost:8090/vehiculosDisp/';

	this.getClientes = function() {
		return $http.get(baseUrlGetClientes).then(function(respuesta) {
			return respuesta.data;
		});
	};
	this.getPaises = function() {
		return $http.get(baseUrlGetPaises).then(function(respuesta) {
			return respuesta.data;
		});
	};
	this.getCiudades = function(id) {
		return $http.get(baseUrlGetCiudades+id).then(function(respuesta) {
			return respuesta.data;
		});
	};
	this.getVehiculos = function(id) {
		return $http.get(baseUrlGetVehiculos+id).then(function(respuesta) {
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