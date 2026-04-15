-- Ativação da extensão PostGIS para geolocalização
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enumerações para garantir integridade dos dados
CREATE TYPE user_role AS ENUM ('trainer', 'student', 'admin');
CREATE TYPE subscription_status AS ENUM ('active', 'past_due', 'canceled', 'trialing');

-- Tabela de Usuários (Base para Autenticação)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Perfis (Dados específicos e Geolocalização)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    specialties TEXT[], -- Ex: ['Hipertrofia', 'Emagrecimento']
    location GEOGRAPHY(Point, 4326), -- Armazena Longitude e Latitude
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- Índice Espacial para otimizar buscas por raio (PostGIS)
CREATE INDEX idx_profiles_location ON profiles USING GIST (location);

-- Tabela de Exercícios (Biblioteca Global ou do Trainer)
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Se NULL, é global
    name VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(100) NOT NULL,
    media_url VARCHAR(500), -- Vídeo ou GIF de execução
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Treinos (Templates ou Treinos Atribuídos)
CREATE TABLE trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Se NULL, é um Template
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_template BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relação N:M entre Treinos e Exercícios (Detalhes da Ficha)
CREATE TABLE training_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    training_id UUID NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    sets INTEGER NOT NULL DEFAULT 3,
    reps VARCHAR(50) NOT NULL, -- Pode ser "10-12" ou "Até a falha"
    rest_seconds INTEGER NOT NULL DEFAULT 60,
    order_index INTEGER NOT NULL, -- Ordem de execução no treino
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Assinaturas (Controle Financeiro B2B)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    plan_name VARCHAR(100) NOT NULL,
    status subscription_status NOT NULL DEFAULT 'trialing',
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_trainer_subscription UNIQUE (trainer_id)
);
