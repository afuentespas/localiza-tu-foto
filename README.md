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

## Instrucciones de uso

### 1. Pantalla principal
Al abrir la aplicación, se muestra la pantalla de inicio. En ella aparece una animación informativa en canvas que representa el número de localizaciones guardadas, junto con los accesos principales de la app. Desde esta pantalla puedes comenzar una nueva captura o consultar la colección almacenada.

### 2. Tomar una nueva fotografía
Pulsa el botón “Tomar una fotografía” para iniciar una nueva captura.  
En ese momento, la aplicación:

- solicita los permisos de geolocalización,
- obtiene la posición actual del dispositivo,
- abre la cámara,
- y toma una fotografía.

Si todo se realiza correctamente, la app te llevará a la pantalla de guardado. Si ocurre algún problema relacionado con la ubicación o los permisos, se mostrará un mensaje de error indicando que debes activar y conceder los permisos de ubicación para poder utilizar la aplicación correctamente.

### 3. Guardar una localización
Después de hacer la fotografía, accederás a una pantalla en la que podrás revisar la imagen capturada y completar la información de la localización. En esta vista se muestran:

- la fotografía tomada,
- la latitud,
- la longitud,
- un campo para el título,
- y un campo para las notas.

En esta pantalla tienes dos opciones:

- Guardar: almacena la fotografía junto con el título, las notas y las coordenadas.
- Cancelar: descarta la operación y vuelve a la pantalla principal.

Cuando una localización se guarda correctamente, la aplicación la añade al almacenamiento local del dispositivo y muestra un mensaje de confirmación.

### 4. Ver la colección
Pulsa el botón “Ver colección” para acceder al listado de localizaciones guardadas.  
En esta pantalla se muestra una tarjeta por cada localización almacenada. Cada tarjeta incluye:

- la imagen asociada,
- el título,
- las notas,
- la latitud,
- y la longitud.

Antes de generar este listado, la app limpia el contenido anterior y vuelve a construir todas las tarjetas a partir del array de localizaciones guardadas. 
### 5. Editar una localización
En cada tarjeta del listado aparece un botón de acceso a la edición.  
Al pulsarlo, la aplicación reutiliza la misma pantalla de guardado, pero cargando los datos ya existentes de esa localización:

- imagen,
- título,
- notas,
- latitud,
- longitud.

En este modo ya no se trata de una nueva captura, sino de una edición. Por eso cambian los botones disponibles y se habilitan las acciones correspondientes para actualizar o eliminar esa localización. 

### 6. Guardar cambios en una localización existente
Si modificas el título o las notas de una localización ya guardada y confirmas la operación, la aplicación sustituirá la información anterior por la nueva y volverá a guardar el array actualizado en el almacenamiento local. Después, se mostrará un mensaje indicando que la fotografía se ha editado correctamente.

### 7. Eliminar una localización
Desde la pantalla de edición también puedes borrar una localización.  
Al hacerlo, la aplicación:

- elimina el elemento del array,
- actualiza el almacenamiento local,
- vuelve a generar el listado,
- y muestra un mensaje de confirmación indicando que la localización se ha borrado correctamente.