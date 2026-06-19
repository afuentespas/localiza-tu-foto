import './../css/style.css';
import { crearSketch } from './sketch.js';

// Incluimos el código HTML estático desde aquí para evitar problemas de carga en p5.js
document.querySelector('#app').innerHTML = `
<div id="inicio">
    <header class="flex items-center justify-between mb-6 py-3 border-b border-white/10">
        <div class="flex items-center gap-3">
            <div>
                <h1 class="text-white font-bold tracking-tight text-4xl">Localiza tu foto</h1>
                <p class="text-white/70 text-lg/5">Guarda tus lugares favoritos</p>
            </div>
        </div>
    </header>
    <div class="bloque-alerta flex items-start gap-3 rounded-2xl px-4 py-3 border shadow-lg shadow-black/10 mb-5">
        <div class="min-w-0">
            <h3 class="titulo-alerta text-sm font-semibold"></h3>
            <p class="mensaje-alerta mt-1 text-sm"></p>
        </div>
    </div>
    <div id="canvas-resumen" class="mt-6 rounded-3xl overflow-hidden border border-white/10 bg-slate-950"></div>
    <button id="btn-tomar-fotografia" class="w-full mt-5 text-xl rounded-md bg-cyan-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Tomar nueva fotografía</button>
    <button id="btn-ver-coleccion" class="w-full text-xl mt-5 rounded-md bg-violet-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Ver colección</button>
</div>
<div id="guardar-imagen">
    <header class="relative flex items-center justify-center border-b border-white/10 bg-slate-950 px-4 py-4">
        <h1 class="text-lg font-semibold tracking-tight text-white">Guardar localización</h1>
    </header>
    <div class="bloque-alerta flex items-start gap-3 rounded-2xl px-4 py-3 border shadow-lg shadow-black/10 mb-5">
        <div class="min-w-0">
            <h3 class="titulo-alerta text-sm font-semibold"></h3>
            <p class="mensaje-alerta mt-1 text-sm"></p>
        </div>
    </div>
    <div id="contenedor-imagen" class="mt-5 grid w-full place-items-center rounded-lg"><img id="imagen-tomada" class="object-cover object-center w-full rounded-lg"></div>
    <form class="mt-5 text-white/90">
        <label class="font-medium" for="titulo">Título</label>
        <input id="titulo" class="w-full border mt-1.5 mb-4 border-gray-500/30 outline-none rounded py-2.5 px-3 bg-slate-900">
        <label class="font-medium" for="notas">Notas</label>
        <textarea rows="2" id="notas" class="w-full resize-none border mt-1.5 mb-4 border-gray-500/30 outline-none rounded py-2.5 px-3 bg-slate-900"></textarea>
        <p class="font-medium">Dirección</p>
        <input type="hidden" id="rutaImagen" name="rutaImagen"/>
        <p id="direccion"></p>
        <p class="font-medium mt-5">Coordenadas</p>
        <div><span class="mr-10"><strong class="text-blue-300 mr-3">Latitud</strong><span id="latitud"></span></span><span><strong class="text-blue-300 mr-3">Longitud</strong><span id="longitud"></span></span></div>
        <div class="mt-5 flex gap-3">
            <button id="guardar-localizacion" class="w-full text-xl rounded-md bg-cyan-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Guardar</button>
            <button id="editar-localizacion" class="w-full text-xl rounded-md bg-cyan-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Guardar</button>
            <button id="cancelar-guardar-localizacion" class="w-full text-xl rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Cancelar</button>
            <button id="borrar-localizacion" class="w-full text-xl rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Eliminar</button>
        </div>
    </form>
</div>
<div id="lista-localizaciones" class="flex w-full items-center justify-between ">
    <header class="relative flex items-center justify-center border-b border-white/10 bg-slate-950 px-4 py-4">
        <h1 class="text-lg font-semibold tracking-tight text-white">Mis localizaciones</h1>
    </header>
    <div class="bloque-alerta flex items-start gap-3 rounded-2xl px-4 py-3 border shadow-lg shadow-black/10 mb-5">
        <div class="min-w-0">
            <h3 class="titulo-alerta text-sm font-semibold"></h3>
            <p class="mensaje-alerta mt-1 text-sm"></p>
        </div>
    </div>
    <div id="listado" class="mt-5"></div>
</div>
`;

crearSketch();
