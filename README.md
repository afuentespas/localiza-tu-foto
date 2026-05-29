# Localiza tu foto

Aplicación móvil desarrollada con **Vite**, **p5.js** y **Capacitor** para guardar fotografías junto con la ubicación geográfica en la que fueron tomadas.

La app permite capturar una imagen con la cámara del dispositivo, obtener las coordenadas del lugar en ese mismo momento y guardar toda esa información en una colección local junto con un título y unas notas.

---

## Tecnologías utilizadas

- **Vite**
- **JavaScript**
- **p5.js**
- **Tailwind CSS**
- **Capacitor**
- Plugins de Capacitor:
  - **Camera**
  - **Geolocation**

---

## Funcionalidades principales

- Captura de fotografías usando la cámara del dispositivo.
- Obtención de la geolocalización en el momento de realizar la fotografía.
- Guardado local de cada localización con:
  - título
  - notas
  - latitud
  - longitud
  - ruta de la imagen
- Listado de localizaciones guardadas.
- Edición de la información de una localización.
- Eliminación de localizaciones guardadas.
- Visualización animada en canvas con p5.js del número de localizaciones almacenadas.

---

## Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/afuentespas/localiza-tu-foto.git
cd localiza-tu-foto
```

### 2. Instalar dependencias

```bash
npm install
```

---

## Ejecución en navegador

Para arrancar la aplicación en modo desarrollo desde el navegador:

```bash
npm run start
```

Después, abre en el navegador la URL que indique Vite, normalmente:

```text
http://localhost:5173
```

---

## Construcción del proyecto

Para generar la versión de producción:

```bash
npm run build
```

Esto generará la carpeta `dist/`, que es la que utilizará Capacitor para la app móvil.

---

## Uso con Capacitor

### Sincronizar cambios con Android

Cada vez que hagas cambios en el proyecto y quieras llevarlos a Android:

```bash
npm run build
npx cap sync android
```

Si necesitas abrir Android Studio, puede ejecutar este comando desde la terminal:

```bash
npx cap open android
```

## Funcionamiento básico de la aplicación

### Pantalla principal

La pantalla principal muestra:

- una animación en canvas realizada con **p5.js**
- el número de localizaciones guardadas
- un botón para tomar una nueva fotografía
- un botón para ver la colección guardada

### Tomar una nueva fotografía

Cuando el usuario pulsa el botón de tomar una fotografía:

1. la app solicita permisos de geolocalización
2. obtiene la posición actual del dispositivo
3. abre la cámara
4. permite tomar una fotografía
5. muestra una pantalla donde se visualiza:
   - la imagen capturada
   - la latitud
   - la longitud
   - un campo de título
   - un campo de notas

Desde esta pantalla el usuario puede:

- guardar la localización
- cancelar la operación

### Listado de localizaciones

La app dispone de una pantalla de colección donde se muestran todas las localizaciones guardadas.

Cada elemento del listado muestra:

- miniatura de la imagen
- título
- notas
- coordenadas

Además, cada elemento puede editarse o eliminarse.

---

## Persistencia de datos

La aplicación almacena las localizaciones localmente en el dispositivo, de forma que la información permanece disponible entre sesiones.

Cada localización contiene:

- título
- notas
- latitud
- longitud
- ruta de la imagen

---

## Permisos necesarios

La aplicación necesita permisos para:

- **cámara**
- **ubicación**
- **guardado de imágenes en galería** (según el sistema y configuración)

Si el usuario no concede permisos o tiene la geolocalización desactivada, la aplicación muestra un mensaje de error informativo.

---

## Plugins de Capacitor utilizados

### Camera

Permite abrir la cámara del dispositivo y capturar la fotografía.

### Geolocation

Permite obtener las coordenadas actuales del dispositivo.

---