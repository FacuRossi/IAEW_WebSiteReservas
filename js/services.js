angular.module('webSiteReservasApp')

.service('vehiculosSvc', function($q, $http) {
	var baseUrlGetPaises = 'http://localhost:8090/paises';
	var baseUrlGetCiudades = 'http://localhost:8090/ciudades/';
	var baseUrlGetVehiculos = 'http://localhost:8090/vehiculosDisp/';

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

	this.registrarReserva = function(id, pb,pv,idC,idV){
		var f = new Date();
		var data = {
			codigoDeReserva:id,
			cliente: {
				id:idC,
				nombre: "",  
				apellido: "" 
			},
			vendedor: {
				id:idV,
				nombre: "",
				apellido: ""
			},
			fechaDeReserva:f,
			costo:pb,
			precioVenta:pv
		};
		var dataSoap = {
			IdVehiculoCiudad:id,
			apellidoNombreCliente:'',
			nroDocumentoCliente:'',
			lugarDevolucion:'TerminalBuses',
			lugarRetiro:'TerminalBuses'
		};
		$http.get('http://localhost:8090/vendedores/'+idV).then(function(respuesta) {
			data.vendedor["nombre"]= respuesta.data.nombre;
			data.vendedor["apellido"]= respuesta.data.apellido;
		});
		$http.get('http://localhost:8090/clientes/'+idC).then(function(respuesta) {
			data.cliente["nombre"]= respuesta.data.nombre;
			data.cliente["apellido"]= respuesta.data.apellido;
			dataSoap["apellidoNombreCliente"] =respuesta.data.apellido + ' ' + respuesta.data.nombre;
			dataSoap["nroDocumentoCliente"]=respuesta.data.dni;
		});
		var config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}
		$http.post(baseUrlGetReservas, data,config);
		// console.log(dataSoap);
		// $http.post('http://localhost:8090/reservaSoap',dataSoap,config);
	}
});