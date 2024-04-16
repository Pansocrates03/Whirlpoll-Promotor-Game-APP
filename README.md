# WhirlPromoAPP
 Esta aplicación fue hecha para la clase de *Construcción de Software* de 4


## ¿Cómo hacer jalar este repo?
1. Descargar el repo
2. crear el archivo /database/db.config.js
3. Agregar las credenciales de la base de datos en el siguiente formato:

```js
module.exports = {
      user:  "", // Instance Username
      password: "", // Instance Password
      server: "", // server or host
      database: "", // Database name
      options: {
          trustServerCertificate: true,
      }
};
```
4. Ejecutar el comando:  `node index.js`
5. Listo, el proyecto está listo para funcionar.

## Créditos
- Esteban Sierra Baccio | Dirección General y desarrollo de REST API y base de datos.
- Gabriel Mujica Proux | Especialista en desarrollo Móvil.
- Sofia Schneider Jimenez | Especialista en desarrollo web
- Fátima Estrella Alonso Luna | Especialista en IA.
- Emilio Magallanes Villagómez | Programación en IA. 