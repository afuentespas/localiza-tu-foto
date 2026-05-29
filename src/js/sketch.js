import p5 from 'p5';
import { Localizacion } from './localizacion.js';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

// Función principal que encapsula toda la lógica de la aplicación con librería p5.js
export function crearSketch() {
  return new p5((p) => {

    let pantallaInicio; // Pantalla principal de la aplicación.
    let pantallaGuardarImagen;  // Pantalla en la que se muestra la imagen capturada y se permite guardar la localización.
    let pantallaListaLocalizaciones; // Pantalla que muestra el listado de localizaciones guardadas.
    let botonHacerFotografia; // Botón principal para tomar una nueva fotografía.
    let botonListaFotografiasGuardadas; // Botón para navegar al listado de localizaciones guardadas.
    let imagenTomada; // Elemento donde se muestra la fotografía tomada.
    let inputTitulo; // Campo de entrada para el título de la localización.
    let textAreaNotas; // Campo de entrada para las notas asociadas a la localización.
    let contenedorLatitud; // Contenedor donde se muestra la latitud.
    let contenedorLongitud; // Contenedor donde se muestra la longitud.
    let botonGuardarLocalizacion; // Botón para guardar una nueva localización.
    let botonGuardarEdicionLocalizacion; // Botón para guardar la edición de una localización existente.
    let botonCancelarGuardarLocalizacion; // Botón para cancelar la operación de guardado.
    let botonBorrarLocalizacion; // Botón para borrar una localización existente.
    let listadoLocalizaciones; // Contenedor donde se renderiza el listado de tarjetas de localizaciones.
    let botonVolverInicio; // Botón para volver a la pantalla de inicio.
    let botonVolverAlListadoLocalizaciones; // Botón para volver al listado desde la pantalla de edición.
    let contenedorCanvasResumen; // Contenedor del resumen mostrado en la pantalla principal.
    let canvasResumen; // Referencia al canvas creado con p5.js.
    let localizacionesGuardadas = []; // Array que almacena todas las localizaciones guardadas por el usuario.

    p.setup = () => {
      // Llamada a la función que gestiona la vinculación de los elementos creador en el DOM
      vincularElementosDOM();
      // Si existen localizaciones guardadas en el almacenamiento local,
      // se recuperan al iniciar la aplicación.
      if (p.getItem('localizaciones')) {
        localizacionesGuardadas = p.getItem('localizaciones');
      }
      // Llamada a la función que inicializa el resumen de la pantalla principal 
      inicializarCanvasResumen();
      // Llamada a la función que establece la visualización de la pantalla principal.
      establecerPantallaInicio();
    };

    p.draw = () => {
      // Llamada a la función que se utiliza para dibujar la animación informativa de la pantalla principal.
      animacionInformativaPantallaPrincipal();
    }

    // Función que vincula todos los elementos del DOM necesarios en variables y crea algunos botones que se
    // asocian con sus eventos.
    function vincularElementosDOM() {
      // Vinculamos los distintos elementos del DOM en variables.
      pantallaInicio = p.select('#inicio');
      pantallaGuardarImagen = p.select('#guardar-imagen');
      pantallaListaLocalizaciones = p.select('#lista-localizaciones');
      botonHacerFotografia = p.select('#btn-tomar-fotografia');
      botonListaFotografiasGuardadas = p.select('#btn-ver-coleccion');
      imagenTomada = p.select('#imagen-tomada');
      inputTitulo = p.select('#titulo');
      textAreaNotas = p.select('#notas');
      contenedorLatitud = p.select('#latitud');
      contenedorLongitud = p.select('#longitud');
      botonGuardarLocalizacion = p.select('#guardar-localizacion');
      botonGuardarEdicionLocalizacion = p.select('#editar-localizacion');
      botonCancelarGuardarLocalizacion = p.select('#cancelar-guardar-localizacion');
      botonBorrarLocalizacion = p.select('#borrar-localizacion');
      listadoLocalizaciones = p.select('#listado');
      botonVolverInicio = p.createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-white" ><path fill-rule="evenodd" d="M10.72 19.28a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 1 1 1.06 1.06L5.78 11.72H20a.75.75 0 0 1 0 1.5H5.78l4.94 4.94a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" /> </svg>')
        .class('absolute top-11');
      botonVolverAlListadoLocalizaciones = p.createButton('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-white" ><path fill-rule="evenodd" d="M10.72 19.28a.75.75 0 0 1-1.06 0l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 1 1 1.06 1.06L5.78 11.72H20a.75.75 0 0 1 0 1.5H5.78l4.94 4.94a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" /> </svg>')
        .class('absolute top-11');
      contenedorCanvasResumen = p.select('#canvas-resumen');

      // Vinculamos los distintos eventos a los botones.
      botonHacerFotografia.mousePressed(tomarFotografia);
      botonListaFotografiasGuardadas.mousePressed(establecerPantallaListaLocalizacionesAlertasLimpias);
      botonGuardarLocalizacion.mousePressed(guardarLocalizacion);
      botonCancelarGuardarLocalizacion.mousePressed(cancerlarGuardarLocalizacion);
      botonVolverInicio.mousePressed(establecerPantallaInicio);
      botonVolverAlListadoLocalizaciones.mousePressed(establecerPantallaListaLocalizacionesAlertasLimpias);

      // Inserción de los botones dinámicos en sus pantallas correspondientes.
      pantallaGuardarImagen.child(botonVolverInicio);
      pantallaGuardarImagen.child(botonVolverAlListadoLocalizaciones);
      pantallaListaLocalizaciones.child(botonVolverInicio);
    }

    // Función que miestra la pantalla principal y oculta el resto.
    function establecerPantallaInicio() {
      pantallaInicio.show();
      pantallaGuardarImagen.hide();
      pantallaListaLocalizaciones.hide();
    }


    // Función que abre la cámara, solicita la ubicación del usuario y, si todo va bien,
    // pasa a la pantalla de guardado con la imagen y las coordenadas capturadas.
    async function tomarFotografia() {
      try {
        // Limpiamos los mensajes de alerta que se hayan mostrado con anterioridad.
        limpiarMensajesAlerta();
        // Solicita permisos de geolocalización al sistema.
        await Geolocation.requestPermissions();
        // Obtiene la posición actual del usuario.
        const posicion = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });
        // Abre la cámara del dispositivo y toma una fotografía.
        const foto = await Camera.takePhoto({
          quality: 90,
          saveToGallery: true,
          includeMetadata: true,
        });
        // Se pasa a la pantalla de guardado con la imagen tomada y la posición actual.
        establecerPantallaGuardarLocalizacion(foto.webPath, posicion);
      } catch (error) {
         // Normalmente el error que se puede dar en este caso es por permisos de ubicación, pero tendría que dejar
         // esto de una manera más genérica por si produce cualquier otro problema. Lo trabajaré para la siguiente entrega.
        crearMensajeAlerta('Error', 'Por favor, activa y concede los permisos de ubicación para usar la aplicación.', true, pantallaInicio);
      }
    }

    // Función que prepara la pantalla de guardado de una nueva localización.
    // Limpia todos los campos, carga la imagen tomada y establece las coordenadas obtenidas.
    function establecerPantallaGuardarLocalizacion(fotoPath, posicion) {
      botonVolverInicio.show();
      botonVolverAlListadoLocalizaciones.hide();
      imagenTomada.attribute('src', fotoPath).attribute('alt', 'Imagen tomada');
      inputTitulo.value('');
      textAreaNotas.value('');
      contenedorLatitud.html(posicion.coords.latitude);
      contenedorLongitud.html(posicion.coords.longitude);
      pantallaInicio.hide();
      pantallaGuardarImagen.show();
      pantallaListaLocalizaciones.hide();
      botonGuardarEdicionLocalizacion.hide();
      botonGuardarLocalizacion.show();
      botonCancelarGuardarLocalizacion.show();
      botonBorrarLocalizacion.hide();
    }

    // Función que prepara la pantalla de edición de una localización existente.
    // Rellena los campos con la información guardada previamente del objeto Localización seleccionado por el usuario.
    function establecerPantallaEditarLocalizacion(indice) {
      botonVolverInicio.hide();
      botonVolverAlListadoLocalizaciones.show();
      let localizacion = localizacionesGuardadas[indice];
      imagenTomada.attribute('src', localizacion.rutaImagen).attribute('alt', 'Imagen tomada');
      inputTitulo.value(localizacion.titulo);
      textAreaNotas.value(localizacion.notas);
      contenedorLatitud.html(localizacion.latitud);
      contenedorLongitud.html(localizacion.longitud);
      pantallaInicio.hide();
      pantallaGuardarImagen.show();
      pantallaListaLocalizaciones.hide();
      botonGuardarEdicionLocalizacion.show();
      botonGuardarLocalizacion.hide();
      botonCancelarGuardarLocalizacion.hide();
      botonBorrarLocalizacion.show();
      // Evento para guardar los cambios de la localización editada teniendo en cuenta la posición del objeto.
      botonGuardarEdicionLocalizacion.mousePressed(() => {
        guardarLocalizacion(indice);
      });
      // Evento para eliminar la localización editada.
      botonBorrarLocalizacion.mousePressed(() => {
        eliminarLocalizacion(indice);
      });
    }

    // Función que muestra la pantalla del listado de localizaciones y genera por cada una de ellas una tarjeta.
    function establecerPantallaListaLocalizaciones() {
      pantallaInicio.hide();
      pantallaGuardarImagen.hide();
      // Limpia el listado antes de volver a generarlo.
      listadoLocalizaciones.html('');
      // Llamada a la función que genera las tarjetas de las distintas localizaciones que tiene guardadas el usuario.
      crearTarjetasLocalizaciones();
      botonVolverInicio.show();
      pantallaListaLocalizaciones.show();
    }

    // Esta función es igual que la anterior, pero hacemos una limpieza previa de las alertas para que no se 
    // muestren alertas que ya no corresponden.
    function establecerPantallaListaLocalizacionesAlertasLimpias() {
      limpiarMensajesAlerta();
      establecerPantallaListaLocalizaciones();
    }

    // Función que gestiona el guardado de una nueva localización o actualiza una existente.
    // Si no se recibe un índice numérico, se interpreta como una nueva localización.
    // Si se recibe un índice, se actualiza la localización existente en esa posición.
    function guardarLocalizacion(indice) {
      let localizacion = new Localizacion(inputTitulo.value(), textAreaNotas.value(), contenedorLatitud.html(), contenedorLongitud.html(), imagenTomada.attribute('src'));
      limpiarMensajesAlerta();
      // Comprobamos que si el índice es un número.
      if (typeof indice !== 'number') {
        localizacionesGuardadas.push(localizacion);
        crearMensajeAlerta('Operación completada', 'La fotografía se ha guardado correctamente en la colección.', false, pantallaInicio);
        p.storeItem('localizaciones', localizacionesGuardadas);
        establecerPantallaInicio();
      }
      else {
        localizacionesGuardadas[indice] = localizacion;
        crearMensajeAlerta('Operación completada', 'La fotografía se ha editado correctamente.', false, pantallaListaLocalizaciones);
        p.storeItem('localizaciones', localizacionesGuardadas);
        establecerPantallaListaLocalizaciones();
      }
    }

    // Función que cancela la operación de guardado y vuelve a la pantalla principal.
    function cancerlarGuardarLocalizacion() {
      limpiarMensajesAlerta();
      establecerPantallaInicio();
    }

    // Función responsable de recorrer el array de localizaciones guardadas y genera una tarjeta visual por cada una.
    // Cada tarjeta incluye imagen, texto descriptivo y botón de acceso a la edición.
    function crearTarjetasLocalizaciones() {
      localizacionesGuardadas.forEach((localizacion, indice) => {
        // Tarjeta contenedora de la localización.
        let tarjeta = p.createDiv().class('flex overflow-hidden rounded-2xl bg-slate-900 shadow-lg shadow-black/20 mb-4');

        // Bloque de la imagen.
        let bloqueImagen = p.createDiv().class('w-25 shrink-0 bg-slate-800');
        let imagen = p.createImg(localizacion.rutaImagen, localizacion.titulo).class('h-full w-full object-cover');
        bloqueImagen.child(imagen);
        // Bloque de texto de la tarjeta.
        let bloqueTexto = p.createDiv().class('min-w-0 flex-1 p-3');
        bloqueTexto.child(p.createP(localizacion.titulo).class('truncate text-base font-semibold text-white'));
        bloqueTexto.child(p.createP(localizacion.notas).class('mt-1 text-sm text-slate-300'));
        bloqueTexto.child(p.createP(`Lat: ${localizacion.latitud}`).class('mt-2 text-xs text-slate-400'));
        bloqueTexto.child(p.createP(`Lng: ${localizacion.longitud}`).class('text-xs text-slate-400'));
        // Bloque que contiene el botón de edición.
        let bloqueEditar = p.createDiv().class('flex items-center justify-center px-4');
        let botonEditar = p.createButton('>').class('rounded-xl p-2 text-cyan-300');
        // Establecemos el evento que hará que se abra la pantalla de edición de esa localización.
        botonEditar.mousePressed(() => {
          establecerPantallaEditarLocalizacion(indice);
        });
        bloqueEditar.child(botonEditar);
        // Montaje de la tarjeta.
        tarjeta.child(bloqueImagen);
        tarjeta.child(bloqueTexto);
        tarjeta.child(bloqueEditar);

        // Inserción de la tarjeta en el listado.
        listadoLocalizaciones.child(tarjeta);
      });
    }

    // Función que gestiona la eliminación de una localización del array, actualiza el almacenamiento local
    // y muestra una alerta informativa.
    function eliminarLocalizacion(indice) {
      const titulo = localizacionesGuardadas[indice].titulo;
      localizacionesGuardadas.splice(indice, 1);
      p.storeItem('localizaciones', localizacionesGuardadas);
      limpiarMensajesAlerta();
      crearMensajeAlerta('Operación completada', `La localización "<b>${titulo}</b>" se ha borrado correctamente.`, false, pantallaListaLocalizaciones);
      establecerPantallaListaLocalizaciones();
    }

    // Función generica y reutilizable para crear mensajes de alerta dentro de la aplicación.
    function crearMensajeAlerta(titulo, mensaje, esError, pantalla) {
       // Se buscan los elementos internos del bloque de alerta de la pantalla actual.
      const bloqueAlertaPantalla = p.select('.bloque-alerta', pantalla.elt);
      const tituloAlerta = p.select('.titulo-alerta', bloqueAlertaPantalla);
      const mensajeAlerta = p.select('.mensaje-alerta', bloqueAlertaPantalla);
      // Se eliminan todas las clases visuales evitar conflictos.
      bloqueAlertaPantalla.removeClass('border-emerald-400/20').removeClass('bg-emerald-500/10').removeClass('text-emerald-200');
      bloqueAlertaPantalla.removeClass('border-red-400/20').removeClass('bg-red-500/10').removeClass('text-red-200');
      tituloAlerta.removeClass('text-emerald-200').removeClass('text-red-200');
      mensajeAlerta.removeClass('text-emerald-100/80').removeClass('text-red-100/80');
      // Según el tipo de alerta, se aplican unas clases u otras.
      if (!esError) {
        bloqueAlertaPantalla.addClass('border-emerald-400/20').addClass('bg-emerald-500/10').addClass('text-emerald-200');
        tituloAlerta.addClass('text-emerald-200');
        mensajeAlerta.addClass('text-emerald-100/80');
      }
      else {
        bloqueAlertaPantalla.addClass('border-red-400/20').addClass('bg-red-500/10').addClass('text-red-200');
        tituloAlerta.addClass('text-red-200');
        mensajeAlerta.addClass('text-red-100/80');
      }
       // Se actualiza el contenido textual de la alerta.
      tituloAlerta.html(titulo);
      mensajeAlerta.html(mensaje);
      // Mostramos el bloque de alerta en la pantalla correspondiente.
      bloqueAlertaPantalla.show();
    }

    // Función que oculta todos los bloques de alerta de las distintas pantallas.
    function limpiarMensajesAlerta() {
      const bloqueAlertaPantallaInicio = p.select('.bloque-alerta', pantallaInicio.elt);
      const bloqueAlertaPantallaGuardarImagen = p.select('.bloque-alerta', pantallaGuardarImagen.elt);
      const bloqueAlertaPantallaListado = p.select('.bloque-alerta', pantallaListaLocalizaciones.elt);
      bloqueAlertaPantallaInicio.hide();
      bloqueAlertaPantallaGuardarImagen.hide();
      bloqueAlertaPantallaListado.hide();
    }

    // Función que inicializa el canvas para mostrar el resumen animado en la pantalla principal.
    function inicializarCanvasResumen() {
      // Creamos un canvas de altura fija y el ancho se adaptara al ancho disponible del contenedor en función del dispositivo.
      canvasResumen = p.createCanvas(contenedorCanvasResumen.elt.offsetWidth, 280);
      canvasResumen.parent(contenedorCanvasResumen);
    }

    // Función que dibuja una animación informativa en la pantalla principal.
    function animacionInformativaPantallaPrincipal(){
      p.background(2, 6, 23);
      const cx = p.width / 2;
      const cy = p.height / 2;

      // Círculo principal con efecto de pulso.
      const pulso = 42 + p.sin(p.millis() * 0.003) * 6;
      p.noFill();
      p.stroke(34, 211, 238, 90);
      p.strokeWeight(2);
      p.ellipse(cx, cy, pulso * 2, pulso * 2);

      // Segundo círculo interior.
      p.stroke(139, 92, 246, 70);
      p.strokeWeight(1);
      p.ellipse(cx, cy, (pulso - 10) * 2, (pulso - 10) * 2);

      // Texto informativo con el número de localizaciones guardadas.
      p.noStroke();
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(32);
      p.text(localizacionesGuardadas.length, cx, cy - 4);

      p.textSize(15);
      p.fill(180);
      p.text('Localizaciones guardadas', cx, cy + 18);

      // Puntos orbitando alrededor del centro.
      // Cada punto representa visualmente una localización guardada
      for (let i = 0; i < localizacionesGuardadas.length; i++) {
        const angulo = p.millis() * 0.0006 + i * (p.TWO_PI / localizacionesGuardadas.length);
        const radio = 58 + (i % 3) * 10;
        const x = cx + Math.cos(angulo) * radio;
        const y = cy + Math.sin(angulo) * radio;
        p.noStroke();
        p.fill(103, 232, 249, 180);
        p.ellipse(x, y, 8, 8);
      }
    }

  });
}