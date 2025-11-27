-- ====================================================================================
-- SCHEMA DE BASE DE DATOS - PET'S RIDE
-- Descripción: Definición de estructura para Marketplace de Servicios de Mascotas.
-- Incluye: Usuarios, Mascotas, Servicios, Disponibilidad, Reservas, Chat, Pagos y Notificaciones.
-- ====================================================================================

-- 1. CONFIGURACIÓN INICIAL
-- ------------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TIPOS DE DATOS (ENUMS)
-- ------------------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('client', 'provider', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'rejected', 'completed', 'cancelled', 'no_show');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded');
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE transaction_type AS ENUM ('payment', 'refund', 'payout', 'fee');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE notification_type AS ENUM ('booking_update', 'new_message', 'payment_alert', 'system');

-- 3. TABLAS PRINCIPALES
-- ------------------------------------------------------------------------------------

-- Usuarios
CREATE TABLE Users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    latitude DECIMAL(9,6),  
    longitude DECIMAL(9,6), 
    role user_role NOT NULL DEFAULT 'client',
    is_verified BOOLEAN DEFAULT false,
    profile_picture_url TEXT, 
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categorías de Servicios
CREATE TABLE Service_Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    slug VARCHAR(100) UNIQUE
);

-- Mascotas
CREATE TABLE Pets (
    pet_id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    weight_kg DECIMAL(5,2),
    special_needs TEXT,
    birth_date DATE,
    medical_history TEXT,
    gender VARCHAR,
    age INT,
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Servicios (Catálogo)
CREATE TABLE Services (
    service_id BIGSERIAL PRIMARY KEY,
    provider_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES Service_Categories(category_id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    duration_minutes INT DEFAULT 60,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disponibilidad Horaria
CREATE TABLE Provider_Availability (
    availability_id BIGSERIAL PRIMARY KEY,
    provider_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    day day_of_week NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(provider_id, day) 
);

-- 4. OPERACIONES (RESERVAS)
-- ------------------------------------------------------------------------------------

-- Reservas
CREATE TABLE Bookings (
    booking_id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE RESTRICT,
    provider_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE RESTRICT,
    service_id BIGINT REFERENCES Services(service_id) ON DELETE SET NULL,
    pet_id BIGINT REFERENCES Pets(pet_id) ON DELETE SET NULL,
    booking_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    price_at_booking DECIMAL(10, 2) NOT NULL,
    service_name_snapshot VARCHAR(255),
    status booking_status NOT NULL DEFAULT 'pending',
    payment_status payment_status DEFAULT 'unpaid',
    service_location TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reseñas
CREATE TABLE Reviews (
    review_id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES Bookings(booking_id) ON DELETE CASCADE,
    client_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    provider_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLAS DE SOPORTE (CHAT, FINANZAS, NOTIFICACIONES)
-- ------------------------------------------------------------------------------------

-- Conversaciones
CREATE TABLE Conversations (
    conversation_id BIGSERIAL PRIMARY KEY,
    participant1_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    participant2_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    booking_id BIGINT REFERENCES Bookings(booking_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(participant1_id, participant2_id, booking_id)
);

-- Mensajes
CREATE TABLE Messages (
    message_id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL REFERENCES Conversations(conversation_id) ON DELETE CASCADE,
    sender_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transacciones Financieras
CREATE TABLE Transactions (
    transaction_id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT REFERENCES Bookings(booking_id) ON DELETE SET NULL,
    user_id BIGINT NOT NULL REFERENCES Users(user_id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MXN',
    type transaction_type NOT NULL,
    status transaction_status DEFAULT 'pending',
    payment_provider_id VARCHAR(255), 
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notificaciones
CREATE TABLE Notifications (
    notification_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ÍNDICES Y OPTIMIZACIÓN
-- ------------------------------------------------------------------------------------
CREATE INDEX idx_bookings_client_status ON Bookings(client_id, status);
CREATE INDEX idx_bookings_provider_date ON Bookings(provider_id, booking_datetime);
CREATE INDEX idx_bookings_overlap ON Bookings(provider_id, booking_datetime, end_datetime);
CREATE INDEX idx_notifications_user_unread ON Notifications(user_id, is_read);
CREATE INDEX idx_messages_conversation ON Messages(conversation_id, created_at);

-- 7. TRIGGERS (AUTOMATIZACIÓN DE UPDATED_AT)
-- ------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON Users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON Bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON Services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pets_modtime BEFORE UPDATE ON Pets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_conversations_modtime BEFORE UPDATE ON Conversations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();