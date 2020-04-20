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
  return '<br><img src="https://drive.google.com/uc?export=view&id='+id+'" width="'+w+'" height="'+h+'"><br>';
}

EstadoMapamundi.prototype.actualizar = function(registroTemporal) {
	if (!this.mapaListo || this.mapa == null || this.jugadorMapamundi == null) {
		return;
	}
	
	this.jugadorMapamundi.actualizar(registroTemporal, this.mapa);
	this.mapa.actualizar(registroTemporal, this.jugadorMapamundi.posicionEnMapaEnPixeles);

	let localizacionAtravesada = false;

	let info = {"Ep0": "Hola!!! Bienvenida a este viaje.<br>Usa las flechas para mover al personaje y ve a cada casita para poder contarte una hermosa historia. Acompañeme en esta aventura.",
  "Ep1":'Capítulo 1<br>Esta historia empieza un 23 de Abril de 2016. Y quién se iba a imaginar que la hermosa mujer que está bailando ahí se iba a convertir en la persona más especial en todo el mundo.'+image("1DnYnsnX5m-IbufQQ66XGZKzuF1jgjyF-","70","120"),
  "Ep2":'Capítulo 2<br>Y de repente, estabamos en otro país disfrutando un viaje inolvidable. Solo que ella aun ni me daba la hora :( '+image("1kKYecxEVhDWVIFnA9M9g7ApDLmrxcwIu","320", "240") + 'Y ya empezaba a aparecer el agua, para empezar a remar.',
  "Ep3":"Capítulo 3<br>Después a celebrar el cumpleaños de tu hermana, y durante los proximos meses iba a tener que remar y remar y remar y seguir remando..."+image("1cq0k4eL8bU1udsREKQ1YC5hhL7GKfQmP","320","240"),
  "Ep4":"Capítulo 4<br>Y llegó el día de mi cumpleaños 2016... Y parecía que la remada no había servido de nada :( " + image("1QMwLtjvVZNipHqMUAlJ0YHHaMYL0z3ti","320","240"),
  "Ep5":"Capítulo 5<br>Pero de repente un día me dijiste que fueramos a crepes cerca a mi oficina, solo tengo esta foto de ese día."+image("18k-aTdx66pKl2-lvY3NpCbzT6EVjZ3Vc","320","240")+" Para que al final me dejaran solo en un anden y ella con sus amigas riendose del amigo que la había acompañado y lo habían dejado ahí solito botado. Con el bote y los remos dañados.",
  "Ep6":"Capítulo 6<br>Sin embargo, todo cambio con esta conversación. 30 de Sept."+image("1BvtgPuScfUlfJKiAvBgaF2k6dN9j7K8h","270","320")+" Y si que iba a necesitar apoyo!!! Galerias... se abalanzaron sobre mi y yo muy inocente. La mejor cosa que podrías haber hecho. :D",
  "Ep7":"Capítulo 7<br>Al final la remada si había servido para algo. Meses de increíble felicidad. Y empezamos a pasear :)" + image("1g5kyiCU5lRc_D54Kw7BwNaPyKwdWXWhJ","320","240"),
  "Ep8":"Capítulo 8<br>Velitas 2016"+image("1e5OIaAcSYAG7jMjJ3K3-dRQfVmuDcaTI","320","240")+"Por fin me llevaste a tu casa después de tanto tiempo escondiendome. Y ese año hasta me autoinvite a Anapoima... muy conchudo, aunque solo fue una noche.",
  "Ep9":"Capítulo 9<br>Y llegó el magnífico 9 de Enero de 2017... <br>Aunque también me convertí en tu exnovio y todo por querer irte soltera a una despedida de soltera.... <br>Jummmm"+image("18iP-4Y88aL0AqYrlbG0C9ChFbOtUEqr4","300","420")+"La foto no es de ese día pero es la más cercana.",
  "Ep10":"Capítulo 10<br>Y vinieron días increiblemente felices a tu lado. Algunos matrimonios, unos mejores que otros, b a a e e b, cumpleaños, días juntos, paseos, bautizos... Días felices :)"+image("1Uka6SgpvJjDIfacjjF1jkgj_MZRhEOGQ","320","240"),
  "Ep11":"Capítulo 11<br>Hasta que me dio por irme para Australia. :/" + image("11is1M_0gIh6XIMf97H3ZV_mtgD09YWqJ","320","240"),
  "Ep12":"Capítulo 12<br>Y otra vez tocaba remar, pero ya no lo hacía solo, sino que remabamos los dos, tal vez tu mas que yo, para que esto siguiera vivo."+image("1yUev8lxmnvJwTs1OLSqsXbpHfUUc7wc1","320","240")+"Mi esperanza era volver a ver eso ojitos tan bonitos otra vez.",
  "Ep13":"Capítulo 13<br>Y llegó el día del regreso, despues de tanto extrañarte, poder volver a verte :)" + image("1q5xyolnJzSHkuR1WH2IDwywnNEocUG4v","320","240"),
  "Ep14":"Capítulo 14<br>El mundo nuevamente se lleno de magia. "+image("1xHlQZAjMcYM2uuw19zWojnNDe-HSXNcj","320","240") + "Y gracias a tí poder disfrutar a tu lado de uno de los lugares más bonitos en todo el mundo.",
  "Ep15":"Capítulo 15<br>Y volvimos a estar juntos, a hacer paseos, a ir a fiestas, a conocer lugares nuevos, a hacer fiestas sorpresas, a ir a matrimonios, h n d d e e m c, y conocimos sitios increíbles."+image("17tdE9Nbl_lmciWDL7QTCwgJOuNszjfzH","320","240") + "Y lo mejor de todo juntos.",
  "Ep16":"Capítulo 16<br>Además conociste Boavita :D." + image("1Jh4dty5hfE2ahXBimuM2bkFnxfajyBPZ","320","240"),
  "Ep17":"Capítulo 17<br>Y otra vez de paseo..."+image("1YubYdav9jgAG53DL8YIRgHN5QVA2ooYE","320","240") + "Donde te pude decir muchas cosas importantes :) Te amo mi cosita!!!",
  "Ep18":"Capítulo 18<br>Y hemos seguido paseando, celebrando, conociendo."+image("1hyV_rWl9xbKkVWBLEArm4-Qi4XERBEFr","320","240")+"Siendo felices...",
  "Ep19":"Capítulo 19<br>Incluso me abandonaste."+image("1DEdtm2ynHzVJJlaiY7XL5RhPfq7AgvBA","320","240") + "Pero no se sintió tan lejos mientras pude ir, porque seguimos paseando :)",
  "Ep20":"Capítulo 20<br>2019-2020 Pasamos juntos el primer año nuevo :) Espero que sea el primero de muchos."+image("1RwFTsG7261_ngbvrTMdRvcusvThSKekx","320","240") + " Aunque perdón porque este año no ha sido lo mejor.",
  "Ep21":"Capítulo 21<br>Me encantaría poder arruncharte lo más pronto posible." + image("1jy2n8tnkauuFilzR9Ak8HE6mX8yVAlfD","320","240"),
  "Final":"Pero mientras tanto y dandole gracias a la vida de poder tenerte a mi lado. Quiero desearte un <br>Feliz Cumpleaños!!!!<br>Espero que podamos celebrarlo juntos muy pronto. Ojala este nuevo año nos permita seguir compartiendo historias y capítulos así estemos separados algunos meses. "+image("16dscUTb4AG38xGpOLQHnP61cN3uMc-k_","320","240") + "Te amo muchísimo y quiero seguir construyendo nuestra historia juntos!<br>Quiero remar a tu lado por mucho tiempo más."
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
