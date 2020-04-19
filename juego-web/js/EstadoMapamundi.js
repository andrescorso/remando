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

function image(id,w,h){
  return '<img src="https://drive.google.com/uc?export=view&id='+id+'" width="'+w+'" height="'+h+'"><br>';
}

EstadoMapamundi.prototype.actualizar = function(registroTemporal) {
	if (!this.mapaListo || this.mapa == null || this.jugadorMapamundi == null) {
		return;
	}
	
	this.jugadorMapamundi.actualizar(registroTemporal, this.mapa);
	this.mapa.actualizar(registroTemporal, this.jugadorMapamundi.posicionEnMapaEnPixeles);

	let localizacionAtravesada = false;

	let info = {"Ep0": "Hola!!! Bienvenida a este viaje.<br>Usa las flechas para mover al personaje y ve a cada casita para poder contarte una hermosa historia. Acompañeme en esta aventura.",
  "Ep1":'Capítulo 1<br>Esta historia empieza un 23 de Abril de 2016. Y quién se iba a imaginar que la hermosa mujer que está bailando ahí se iba a convertir en la persona más especial en todo el mundo.<br>'+image("1DnYnsnX5m-IbufQQ66XGZKzuF1jgjyF-","70","120"),
  "Ep2":'Capítulo 2<br>Y de repente, estabamos en otro país disfrutando un viaje inolvidable. Solo que ella aun ni me daba la hora :(<br> '+image("1kKYecxEVhDWVIFnA9M9g7ApDLmrxcwIu","240", "120") + 'Y ya empezaba a aparecer el agua, para empezar a remar.',
  "Ep3":"Capítulo 3<br>Y llegó el cumpleaños de tu hermana, y durante los proximos meses iba a tener que remar y remar y remar y seguir remando...<br>"+image("16dscUTb4AG38xGpOLQHnP61cN3uMc-k_","320","240"),
  "Ep4":"Capítulo 4<br>Y llegó el día de mi cumpleaños 2016... Y parecía que la remada no había servido de nada :(",
  "Ep5":"Capítulo 5<br>Pero de repente un día me dijiste que fueramos a crepes cerca a mi oficina, solo tengo esta foto de ese día. Para que al final me dejaran solo en un anden y ella con sus amigas riendose del amigo que la había acompañado y lo habían dejado ahí solito botado. Con el bote y los remos dañados.",
  "Ep6":"Capítulo 6<br>Sin embargo, todo cambio con esta conversación. 30 de Sept. Y si que iba a necesitar apoyo!!! Galerias... se abalanzaron sobre mi y yo muy inocente. La mejor cosa que podrías haber hecho. :D",
  "Ep7":"Capítulo 7<br>Al final la remada si había servido para algo. Meses de increíble felicidad. Y empezamos a pasear :)",
  "Ep8":"Capítulo 8<br>Velitas 2016... Por fin me llevaste a tu casa después de tanto tiempo escondiendome. Y ese año hasta me autoinvite a Anapoima... muy conchudo, aunque solo fue una noche.",
  "Ep9":"Capítulo 9<br>Y llegó el magnífico 9 de Enero de 2017... <br>Aunque también me convertí en tu exnovio y todo por querer irte soltera a una despedida de soltera.... <br>Jummmm<br>La foto no es de ese día pero es la más cercana.",
  "Ep10":"Capítulo 10<br>Y vinieron días increiblemente felices a tu lado. Algunos matrimonios, unos mejores que otros, b a a e e b, cumpleaños, días juntos, paseos, bautizos... Días felices :)",
  "Ep11":"Capítulo 11<br>Hasta que me dio por irme para Australia. :/",
  "Ep12":"Capítulo 12<br>Y otra vez tocaba remar, pero ya no lo hacía solo, sino que remabamos los dos, tal vez tu mas que yo, para que esto siguiera vivo. Mi esperanza era volver a ver eso ojitos tan bonitos otra vez.",
  "Ep13":"Capítulo 13<br>Y llegó el día del regreso, despues de tanto extrañarte, poder volver a verte :)",
  "Ep14":"Capítulo 14<br>Y gracias a tí poder disfrutar a tu lado de uno de los lugares más bonitos en todo el mundo.",
  "Ep15":"Capítulo 15<br>Y volvimos a estar juntos, a hacer paseos, a ir a fiestas, a conocer lugares nuevos, a hacer fiestas sorpresas, a ir a matrimonios, h n d d e e m c, y conocimos sitios increíbles. Y lo mejor de todo juntos.",
  "Ep16":"Capítulo 16<br>Además conociste Boavita :D.",
  "Ep17":"Capítulo 17<br>Y otra vez de paseo... Donde te pude decir muchas cosas importantes :) Te amo mi cosita!!!",
  "Ep18":"Capítulo 18<br>Y hemos seguido paseando, celebrando, conociendo, siendo felices...",
  "Ep19":"Capítulo 19<br>Incluso me abandonaste, pero no se sintió tan lejos mientras pude ir, porque seguimos paseando :)",
  "Ep20":"Capítulo 20<br>2019-2020 Pasamos juntos el primer año nuevo :) Espero que sea el primero de muchos, aunque perdón porque este año no ha sido lo mejor.",
  "Ep21":"Capítulo 21<br>Me encantaría poder arruncharte lo más pronto posible.",
  "Final":"Pero mientras tanto y dandole gracias a la vida de poder tenerte a mi lado. Quiero desearte un <br>Feliz Cumpleaños!!!!<br>Espero que podamos celebrarlo juntos muy pronto. Ojala este nuevo año nos permita seguir compartiendo historias y capítulos así estemos separados algunos meses. Te amo muchísimo y quiero seguir construyendo nuestra historia juntos!"
  };

	
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
				    popup.mostrar(dimensiones.ancho / 2 - 150, dimensiones.alto / 2 - 200,
				    340, info[nombre]);
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
