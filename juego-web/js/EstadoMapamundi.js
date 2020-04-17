function EstadoMapamundi(idEstado, rutaMapaJSON, xInicial, yInicial) {
	var that = this;
	this.mapaListo = false;
	this.mapa = null;
	this.jugadorMapamundi = null;
	this.entrepor = "";
	this.salipor = "";
	ajax.cargarArchivo(rutaMapaJSON, function(objetoJSON) {
		that.mapa = new Mapa(objetoJSON, idEstado);
		that.mapaListo = true;
		that.jugadorMapamundi = new JugadorMapamundi(new Punto(xInicial, yInicial), idEstado);
		console.log("mapa cargado por AJAX");
	});
}

EstadoMapamundi.prototype.actualizar = function(registroTemporal) {
	if (!this.mapaListo || this.mapa == null || this.jugadorMapamundi == null) {
		return;
	}
	
	this.jugadorMapamundi.actualizar(registroTemporal, this.mapa);
	this.mapa.actualizar(registroTemporal, this.jugadorMapamundi.posicionEnMapaEnPixeles);

	let localizacionAtravesada = false;

	let info = {"Ep0": "Hola!!! Bienvenida a este viaje. \nUsa las flechas para moverte y ve a cada casa para descubrir mas."};
	
	for(var i = 0; i < this.mapa.rectangulosLocalizaciones.length; i++) {
		let rActual = this.mapa.rectangulosLocalizaciones[i].rectangulo;
		let nombre = this.mapa.rectangulosLocalizaciones[i].nombre;
		let rTemporal = new Rectangulo(rActual.x + this.mapa.posicion.x,
		rActual.y + this.mapa.posicion.y, rActual.ancho, rActual.alto);
		let objetoEntradaLocalizacion = null;
		if(rTemporal.cruza(this.jugadorMapamundi.rectanguloGeneral)) {
			localizacionAtravesada = true;
			objetoEntradaLocalizacion = registroLocalizaciones.obtenerLocalizacion(nombre);
			if ((nombre == "barco" || nombre  == "tierra")){
  			    this.salipor = nombre;
			}
			if(!popup.visible) {
				if ((nombre == "barco" || nombre  == "tierra")){
				    popup.mostrar(dimensiones.ancho / 2 - 150, dimensiones.alto / 2 - 100,
				    300, "Y ahora?");
					this.entrepor=nombre;
				}else{
				    popup.mostrar(dimensiones.ancho / 2 - 150, dimensiones.alto / 2 - 100,
				    300, info[nombre]);
				}
			}
			if(teclado.teclaPulsada(controlesTeclado.entrarLocalizacion)) {
				maquinaEstados.cambiarEstado(listadoEstados.NIVEL, objetoEntradaLocalizacion);
				console.log(objetoEntradaLocalizacion);
			}
		}

	}
	if(!localizacionAtravesada && popup.visible) {
		if (this.entrepor != this.salipor){
			console.log(this.salipor);
			if (this.salipor == "tierra"){
				//Cambiar jugador a tierra
				this.jugadorMapamundi.actualizarPersonaje(0);

			}else if(this.salipor == "barco"){
				//Cambiar jugador a barco
				this.jugadorMapamundi.actualizarPersonaje(1);

			}
		}
		this.entrepor = "";
		this.salipor = "";

		popup.ocultar();

	}
}

EstadoMapamundi.prototype.dibujar = function() {
	if (!this.mapaListo) {
		return;
	}
	this.mapa.dibujar();
}
