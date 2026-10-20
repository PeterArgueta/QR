# Generador de códigos QR

Aplicación web para crear y descargar **códigos QR personalizados a partir de una URL**, con una interfaz adaptable a computadoras y dispositivos móviles.

**Demostración:** https://qr.converttomap.com

## Capacidades

- Generación de códigos QR con vista previa en tiempo real.
- Personalización de colores de fondo y primer plano.
- Configuración de tamaño y nivel de corrección de errores (L, M, Q, H).
- Incorporación opcional de un logotipo central y distintos estilos de marco.
- Exportación de la imagen como PNG.
- Modo claro u oscuro y validación de URL.

## Tecnologías y estructura

Frontend construido con **React 18 y Vite**, usando `qrcode.react` para generar códigos QR y `framer-motion` como dependencia de interfaz.

```text
src/          Componentes y lógica de la aplicación
public/       Recursos públicos
index.html    Documento de entrada
vite.config.js Configuración de compilación
package.json  Dependencias y scripts
```

## Ejecución local

Se requiere una versión de Node.js compatible con el proyecto.

```bash
git clone https://github.com/PeterArgueta/QR.git
cd QR
npm ci
npm run dev
```

Vite mostrará la dirección local de desarrollo, habitualmente `http://localhost:5173`.

## Compilación y despliegue

```bash
npm run build
npm run preview
```

El script `npm run deploy` compila y publica la carpeta `dist/` mediante `gh-pages`, según la configuración existente. El dominio publicado es `qr.converttomap.com`; verifica las configuraciones DNS y de Pages antes de modificar la estrategia de publicación.

## Mantenimiento

Las dependencias se gestionan mediante `package.json` y `package-lock.json`. Los directorios `node_modules/` y los archivos de entorno locales deben excluirse del control de versiones. Este cambio de documentación no retira dependencias del historial ni modifica el despliegue.

El generador se orienta a URLs. Un QR con logotipo, colores de poco contraste o tamaño reducido puede resultar difícil de leer; comprueba la imagen generada con varios lectores antes de utilizarla públicamente.

## Autor

[Peter Argueta](https://github.com/PeterArgueta)
