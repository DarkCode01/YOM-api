### La estructura que se uso para este projecto es para mantener ordenado los diferentes modulos.

* > `controllers/` -> Encargados de procesar la peticion.
* > `models/` -> Los modelos.
* > `routes/` -> Configurar las rutas
* > `middlewares/` -> Configurar procesos que se ejecutaran antes de los controllers.
* > `utils/` -> Funciones que se usaran con frecuencia...
* > `tmp/` -> para almacenar de forma temporal las imagenes subidas.

> Al momento de crear un modulo o archivo nuevo, se debera de colocar el folder a que pertenece y seguido de la extension ej: `auth.controller.js` > este archivo hira dentro de la carpeta `controller`.

> **Esto se hizo para mejorar la estructura del projecto como tal.**

<br />
<br />


En el archivo `.env.example` estan definidas las variables de entorno que se utiliza en `dev` es decir en el ambiente de desarrollo.

--
Pasos para correr el proyecto de la API REST.

```shell
# instalar las dependencias
> npm install

# crear el archivo `.env` para las variables de entorno
# ojo, para saber que variables crear leer el archivo `.env.example`
> cat .env.example > .env

# correr el proyecto && listo.
> npm run dev
```