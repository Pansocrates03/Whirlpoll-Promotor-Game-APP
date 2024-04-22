-- WhirlPool
-- Esteban Sierra Baccio
-- Apr/19/2024
-- https://lucid.app/lucidchart/3f05bc08-c811-4fe6-9f29-0d19de39caee/edit?invitationId=inv_886097ae-b5b1-481e-be8a-f6f0995107d7&page=0_0#

CREATE DATABASE WhirlPool;
USE WhirlPool;

-- TABLE CREATION

CREATE TABLE notificaciones(
    id INT PRIMARY KEY IDENTITY,
    descripcion VARCHAR(255),
    fecha DATE,
    estatus INT,
)

CREATE TABLE rol(
    id INT PRIMARY KEY IDENTITY,
    descripcion VARCHAR(25)
)

CREATE TABLE ubicacion(
    id INT PRIMARY KEY IDENTITY,
    nombre VARCHAR(50) NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL    
)

CREATE TABLE empleado(
    id INT PRIMARY KEY IDENTITY,
    nombre VARCHAR(50),
    rol INT FOREIGN KEY REFERENCES rol(id),
    puntos INT
)

CREATE TABLE estatus(
    id INT PRIMARY KEY IDENTITY,
    descripcion VARCHAR(15)
)

CREATE TABLE motivoreporte(
    id INT PRIMARY KEY IDENTITY,
    descripcion VARCHAR(255)
)

CREATE TABLE empleadonotif(
    idempleado INT FOREIGN KEY REFERENCES empleado(id),
    idnotificacion INT FOREIGN KEY REFERENCES notificaciones(id),
    leido BIT -- 0 ES FALSE, 1 ES TRUE
)

CREATE TABLE desafio(
    id INT PRIMARY KEY IDENTITY,
    puntos INT,
    descripcion VARCHAR(255)
)

CREATE TABLE reporte(
    id INT PRIMARY KEY IDENTITY,
    generadopor INT FOREIGN KEY REFERENCES empleado(id),
    estatus INT FOREIGN KEY REFERENCES estatus(id),
    resueltopor INT FOREIGN KEY REFERENCES empleado(id),
    ubicacion INT FOREIGN KEY REFERENCES ubicacion(id),
    motivo INT FOREIGN KEY REFERENCES motivoreporte(id),
    fechageneracion DATETIME NOT NULL,
    fechacierre DATETIME,
    descripcion VARCHAR(255)
)

CREATE TABLE empleadodesafio(
    idempleado INT FOREIGN KEY REFERENCES empleado(id),
    iddesafio INT FOREIGN KEY REFERENCES desafio(id),
)

CREATE TABLE imagen(
    id INT PRIMARY KEY IDENTITY,
    idreporte INT FOREIGN KEY REFERENCES reporte(id),
    link VARCHAR(255)
)

-- INSERT PRE-BUILT TABLES

INSERT INTO rol (descripcion) VALUES ('CEO'); -- 1
INSERT INTO rol (descripcion) VALUES ('vendedor'); -- 2
INSERT INTO rol (descripcion) VALUES ('promotor'); -- 3
INSERT INTO rol (descripcion) VALUES ('operador'); -- 4
INSERT INTO rol (descripcion) VALUES ('gerente de finanzas'); -- 5

INSERT INTO estatus (descripcion) VALUES ('no revisado'); -- 1
INSERT INTO estatus (descripcion) VALUES ('en proceso'); -- 2
INSERT INTO estatus (descripcion) VALUES ('revisado'); -- 3

INSERT INTO motivoreporte (descripcion) VALUES ('Nada que reportar'); -- id = 1
INSERT INTO motivoreporte (descripcion) VALUES ('El preico no está visible'); -- id = 2
INSERT INTO motivoreporte (descripcion) VALUES ('El producto está sucio'); -- id = 3
INSERT INTO motivoreporte (descripcion) VALUES ('Espacio desacomodado'); -- id = 4
INSERT INTO motivoreporte (descripcion) VALUES ('El producto no tiene ficha técnica a la vista'); -- id = 5
INSERT INTO motivoreporte (descripcion) VALUES ('El producto que se muestra es muy viejo'); -- id = 6
INSERT INTO motivoreporte (descripcion) VALUES ('Desabasto de productos'); -- id = 7
INSERT INTO motivoreporte (descripcion) VALUES ('Otro motivo'); -- id = 8

INSERT INTO desafio (puntos,descripcion) VALUES (100, 'Encuentra un nuevo piso de venta'); -- 1
INSERT INTO desafio (puntos,descripcion) VALUES (200, 'Realiza 2 reportes el dia de hoy'); -- 2
INSERT INTO desafio (puntos,descripcion) VALUES (10, 'Visita 5 pisos de venta'); -- 3
INSERT INTO desafio (puntos,descripcion) VALUES (70, 'Sube de nivel a tu personaje'); -- 4
INSERT INTO desafio (puntos,descripcion) VALUES (400, 'Obten 3 reportes aceptados'); -- 5

-- Insert variable tables

INSERT INTO ubicacion (nombre,latitud,longitud) VALUES ('Tienda Whirlpool',25.67071757873061, -100.32908301595825);
INSERT INTO ubicacion (nombre,latitud,longitud) VALUES ('Liverpool Melchor Ocampo',25.667825614434125, -100.31601547730031);
INSERT INTO ubicacion (nombre,latitud,longitud) VALUES ('Liverpool Valle Oriente', 25.641780949462376, -100.3146983463275);
INSERT INTO ubicacion (nombre,latitud,longitud) VALUES ('Elektra Jose Maria Ortega', 25.683655258610877, -100.31644102699096);
INSERT INTO ubicacion (nombre,latitud,longitud) VALUES ('Elektra Banco Azteca',25.68362465035514, -100.31269245543339);

INSERT INTO empleado (nombre,rol,puntos) VALUES ('empleado1@yahoo.com.mx',1,0);
INSERT INTO empleado (nombre,rol,puntos) VALUES ('empleado2@gmail.com',2,0);
INSERT INTO empleado (nombre,rol,puntos) VALUES ('empleado3@gmail.com',3,20);
INSERT INTO empleado (nombre,rol,puntos) VALUES ('nombre_apellido_segundoapellido@yahoo.com.mx',4,500);
INSERT INTO empleado (nombre,rol,puntos) VALUES ('andresManuelLopezObrador@gmail.com',5,100000);

-- Como el promotor es el número 2 entonces solo el 2 puede resolver las dudas.
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (2,2,1,2,'2024-04-14 14:30:15','Ya no hay lavadoras del modelo 8MWTW1844WMG');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (4,2,4,3,'2024-04-14 18:22:17','Las lavadoras están desacomodadas');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (3,2,2,5,'2024-04-09 09:43:27','Se encontró un gato dentro de la lavadora');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (3,2,5,1,'2024-02-22 19:13:17','Las lavadoras en el piso 1 tienen mucho polvo encima');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (1,2,3,4,'2024-04-09 10:20:03','La lavadora modelo WW21BBAHME no está funcionando correctamente, hace falta mantenimiento');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (2,2,1,2,'2024-02-30 04:21:23','Se reporta desabasto de filtros para purificador de agua en los refrigeradores Whirlpool serie WRS325SDHZ');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (4,2,5,3,'2024-03-03 11:11:20','Los microondas Whirlpool modelo WMH32519HZ están desordenados en la sala de exhibición, necesitan reubicación según el planograma');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (5,2,2,5,'2024-01-02 17:13:30','La secadora Whirlpool modelo WED4815EW no está secando de manera eficiente, posible problema con el sensor de humedad.');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (3,2,4,1,'2024-02-22 19:13:17','Requiere limpieza el interior del refrigerador Whirlpool modelo WRX735SDHZ por acumulación de residuos alimenticios.');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (1,2,3,4,'2024-04-09 10:20:03','La lavadora modelo WW21BBAHME no está funcionando correctamente, hace falta mantenimiento');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (2,2,5,2,'2024-04-17 08:52:04','Notificación de desabasto de componentes para el lavavajillas Whirlpool WDT970SAHZ, faltan aspersores de repuesto en el inventario');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (4,2,4,3,'2024-03-18 11:18:57','La nueva línea de lavadoras Whirlpool carga frontal modelo WFW6620HW necesita reubicarse en la zona preferencial del showroom');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (5,2,2,5,'2024-02-25 17:55:29','Un cliente ha reportado que su lavadora Whirlpool modelo WTW5000DW1 reproduce sonidos extraños durante el ciclo de centrifugado');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (3,2,1,1,'2024-01-21 01:34:24','Acumulación de hielo excesiva en el congelador del Whirlpool modelo WRF555SDFZ que requiere descongelación y limpieza urgente');
INSERT INTO reporte (generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion) VALUES (1,2,3,4,'2024-01-17 13:54:36','El aire acondicionado portátil Whirlpool modelo WHAP141AW no enfría correctamente, posible fuga de refrigerante detectada');