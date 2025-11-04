-- schema.sql
-- Este script define la estructura (schema) de la base de datos.

-- Crear tipos ENUM personalizados primero
CREATE TYPE user_role AS ENUM ('client', 'provider', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- 1. Tabla de Usuarios (la entidad central)
CREATE TABLE Users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    role user_role NOT NULL DEFAULT 'client',
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Categorías de Servicios (manejada por Admins)
CREATE TABLE Service_Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- 3. Tabla de Mascotas (pertenecen a un 'client')
CREATE TABLE Pets (
    pet_id BIGSERIAL PRIMARY KEY,
    -- Si el dueño (User) se elimina, sus mascotas también
    owner_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    breed VARCHAR(100),
    birth_date DATE,
    medical_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Servicios (ofrecidos por un 'provider')
CREATE TABLE Services (
    service_id BIGSERIAL PRIMARY KEY,
    -- Si el proveedor (User) se elimina, sus servicios también
    provider_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    -- Si la categoría se elimina, restringir (no permitir) si hay servicios usándola
    category_id INT NOT NULL REFERENCES Service_Categories(category_id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    duration_minutes INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabla de Reservas (la conexión principal)
CREATE TABLE Bookings (
    booking_id BIGSERIAL PRIMARY KEY,
    -- Si el cliente (User) se elimina, sus reservas también
    client_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    -- Si el servicio se elimina, sus reservas también
    service_id BIGINT NOT NULL REFERENCES Services(service_id) ON DELETE CASCADE,
    -- Si la mascota se elimina, sus reservas también
    pet_id BIGINT NOT NULL REFERENCES Pets(pet_id) ON DELETE CASCADE,
    
    booking_datetime TIMESTAMPTZ NOT NULL,
    status booking_status NOT NULL DEFAULT 'pending',
    final_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabla de Reseñas (opcional pero recomendada)
CREATE TABLE Reviews (
    review_id BIGSERIAL PRIMARY KEY,
    -- Si la reserva se elimina, la reseña también
    booking_id BIGINT NOT NULL UNIQUE REFERENCES Bookings(booking_id) ON DELETE CASCADE,
    -- Si el cliente se elimina, sus reseñas también
    client_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    -- Si el proveedor se elimina, las reseñas sobre él también
    provider_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- (Opcional) Crear índices para acelerar búsquedas comunes
CREATE INDEX idx_pets_owner_id ON Pets(owner_id);
CREATE INDEX idx_services_provider_id ON Services(provider_id);
CREATE INDEX idx_bookings_client_id ON Bookings(client_id);
CREATE INDEX idx_bookings_service_id ON Bookings(service_id);