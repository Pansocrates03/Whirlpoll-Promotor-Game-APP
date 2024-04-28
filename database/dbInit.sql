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

CREATE TABLE urgencia(
    id INT PRIMARY KEY IDENTITY,
    descripcion VARCHAR(25)
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

