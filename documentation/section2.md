
# Sección 2: Introduction to Node.js and NPM
## Core Modules

Node.js tiene varios módulos compilados en el binario. Estos módulos se describen con mayor detalle en la propia documentación.

Los módulos principales están definidos dentro del código fuente de Node.js y se encuentran en la carpeta lib/.

### File System Module
El módulo "fs" (File System o Sistema de Archivos) en Node.js proporciona funciones y métodos para trabajar con archivos y directorios en el sistema de archivos de la máquina. Permite crear, leer, actualizar y eliminar archivos, así como manipular directorios. Algunas de las operaciones comunes que puedes realizar con este módulo incluyen la lectura y escritura de archivos, la creación y eliminación de directorios, la verificación de la existencia de archivos y la manipulación de rutas de archivo.

> En el siguiente código, leemos un texto desde un archivo de nuestro sistema, y escribimos su contenido dentro de otro nuevo archivo
```
const fs = require('fs');

const myText = fs.readFileSync('./txt/input.txt', 'utf-8');
const textOut = `
This is what we know about the avocado:\n${myText}
Created on ${Date.now()}
`;

fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
```
<sup>En este código usamos la versión síncrona (Sync) de la función .readFile</sup>

### Http module
El módulo http proporciona funcionalidades para crear y escuchar servidores HTTP, manejar solicitudes entrantes, enviar respuestas y administrar encabezados HTTP. Con este módulo, puedes construir aplicaciones y APIs web, gestionar rutas, analizar parámetros de URL y muchas otras cosas más.

```
const http = require('http');

server.listen(8080, '127.0.0.1', () => {
    console.log(`Listening on port 8080`);
});
```
Cada vez que el servidor recibe una petición, se ejecuta el siguiente código
```
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Hello world!</h1>');
}
```

### URL
El módulo "URL" en Node.js permite analizar y formatear direcciones URL. Proporciona métodos para descomponer una URL en sus componentes. . Además, este módulo puede ser utilizado para manipular y modificar componentes individuales de una URL
```
const url = require('url');

const server = http.createServer((req, res) => {
    const output = url.parse(req.url, true);
    console.log(output);
}
```

Si ejecutamos el código anterior y realizamos una petición desde la url `http://localhost:8080/product?id=1` , se mostrará por consola lo siguiente
```
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?id=1',
  query: [Object: null prototype] { id: '1' },
  pathname: '/product',
  path: '/product?id=1',
  href: '/product?id=1'
}
```


## Asincronismo y callbacks
En Node.js, los callbacks se utilizan ampliamente para manejar el asincronismo debido a la naturaleza de programación no bloqueante de la plataforma. Cuando se ejecutan operaciones como la lectura/escritura de archivos o las solicitudes de red, bloquear el hilo principal de ejecución podría resultar en una aplicación lenta y poco eficiente. Los callbacks permiten que el código continúe ejecutándose sin bloqueos mientras se espera que las operaciones asíncronas se completen. Cuando la operación se completa, el callback se invoca, lo que permite manejar el resultado de manera adecuada. 

### Callback Hell
Sin embargo, debemos tener cuidado con esto, ya que podríamos estar cayendo sin darnos cuenta, en el temido callback hell. Esto ocurre cuando se encadenan muchas operaciones asíncronas una tras otra, creando un código confuso y propenso a errores debido a la indentación profunda y la complejidad.

![Representación gráfica del callback hell](https://res.cloudinary.com/practicaldev/image/fetch/s--GK0lccB7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zg6zcvprrd2odms4sc3x.png)

Un claro indicio de que estámos entrando en el callback hell, es la inevitable forma en triángulo que se genera al lado izquierdo de nuestro código

```
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => console.log(err));
            console.log('Your file has been written');
        });
    });
});
```

## Modulos Personalizados
En Node.js, tenemos la capacidad de desarrollar nuestros propios módulos utilizando la función `module.exports` (o bien `export` en ES6). Dado que en Node.js cada archivo se considera un módulo, podemos fragmentar nuestro código en secciones más pequeñas. Este enfoque nos permite lograr un mayor orden y legibilidad en nuestro código, al dividirlo en componentes más manejables.
```
module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    !product.organic ? output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic') : output.replace(/{%NOT_ORGANIC%}/g, 'organic-wii');
    return output;
}

```
Este código reemplaza partes de la plantilla HTML con información del archivo json. Ahora puedo llamar esta función desde cualquier archivo de mi proyecto sin necesidad de repetir código.


## NPM (Node Package Manager)
Es una poderosa herramienta del ecosistema de Node.js que permite a los desarrolladores instalar, gestionar y compartir paquetes de software reutilizables. Estos paquetes contienen código predefinido y funcionalidades que pueden ser incorporados en proyectos de Node.js para agilizar el desarrollo, evitando tener que escribir todo el código desde cero.

#### Tipos de dependencias:
- **Simple dependencies:** Paquetes que usaremos dentro de nuestro projecto. Código sobre el que sentaremos nuestras bases. Por lo tanto, estos paquetes son requeridos para que nuestro programa funcione óptimamente.
- **Development dependencies:** Se refieren a los paquetes y bibliotecas que son necesarios durante el proceso de desarrollo de un proyecto, pero no son esenciales para su funcionamiento en producción. Testing, linters, compiladores, entre otros.

### Instalación de paquetes
```
npm install nombre_del_paquete  //dependencia regular
npm install -D nombre_del_paquete  //dependencia de desarrollo
npm install nombre_del_paquete --global //dependencia global
```
