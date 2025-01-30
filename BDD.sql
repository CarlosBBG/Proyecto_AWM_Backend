-- Crear base de datos
CREATE DATABASE sistema_transporte;
USE sistema_transporte;

-- Tabla de Rutas
CREATE DATABASE `sistema_transporte` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE rutas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_ruta VARCHAR(100) NOT NULL,
    recorrido TEXT NOT NULL,
    asientos_disponibles INT DEFAULT 0
);

-- Tabla de Paradas
CREATE TABLE paradas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_ruta INT,
    nombre_parada VARCHAR(100) NOT NULL,
    orden_parada INT NOT NULL,
    FOREIGN KEY (ruta) REFERENCES rutas(id)
);

-- Tabla de Estudiantes
CREATE TABLE estudiantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Encriptada
    codigo_unico VARCHAR(20) UNIQUE NOT NULL,
    ruta INT,
    parada INT,
    FOREIGN KEY (ruta) REFERENCES rutas(id),
    FOREIGN KEY (parada) REFERENCES paradas(id)
);

-- Tabla de Conductores
CREATE TABLE conductores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Encriptada
    cedula VARCHAR(10) UNIQUE NOT NULL,
    ruta INT,
    FOREIGN KEY (ruta) REFERENCES rutas(id)
);

-- Tabla de Administradores
CREATE TABLE administradores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL -- Encriptada
);

-- Insertar datos en rutas
INSERT INTO rutas (nombre_ruta, recorrido, asientos_disponibles)
VALUES 
    ('Ruta Capulí', 'EPN - Villaflora - Capulí', 20),
    ('Ruta Guamaní', 'EPN - Trébol - Guamaní', 25),
    ('Ruta Quitumbe', 'EPN - Quitumbe', 30);

-- Insertar datos en paradas
INSERT INTO paradas (id_ruta, nombre_parada, orden_parada)
VALUES 
    (1, 'EPN', 1),
    (1, 'Villaflora', 2),
    (1, 'Capulí', 3),
    (2, 'EPN', 1),
    (2, 'Trébol', 2),
    (2, 'Guamaní', 3),
    (3, 'EPN', 1),
    (3, 'Mariscal Sucre', 2),
    (3, 'Quitumbe', 3);

-- Insertar datos en estudiantes
INSERT INTO estudiantes (nombre, apellido, email, password, codigo_unico, id_ruta, id_parada)
VALUES 
    ('Juan', 'Perez', 'juan.perez@epn.edu.ec', '1234hashed', '123456789', 1, 3),
    ('Maria', 'Gomez', 'maria.gomez@epn.edu.ec', '5678hashed', '987654321', 2, 2),
    ('Carlos', 'Lopez', 'carlos.lopez@epn.edu.ec', 'abcdhashed', '112233445', 3, 3);

-- Insertar datos en conductores
INSERT INTO conductores (nombre, apellido, email, password, cedula, id_ruta)
VALUES 
    ('Carlos', 'Rivera', 'carlos.rivera@example.com', 'efghhashed', '0987654321', 1),
    ('Ana', 'Martinez', 'ana.martinez@example.com', 'ijklhashed', '0965432109', 2);

-- Insertar datos en administradores
INSERT INTO administradores (nombre, apellido, email, password)
VALUES 
    ('Admin', 'User', 'admin@example.com', 'adminhashed'),
    ('Manager', 'User', 'manager@example.com', 'managerhashed');
