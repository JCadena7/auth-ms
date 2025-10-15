# Changelog - Auth Microservice

## Actualización de Estructura de Usuarios (Última actualización)

### Cambios Realizados

#### 1. **DTOs Actualizados**

##### SignUpDto (`src/auths/application/dto/sign-up.dto.ts`)
- ✅ Agregado `first_name` (requerido)
- ✅ Agregado `last_name` (requerido)
- ✅ Agregado `username` (opcional)
- ✅ Agregado `phone` (opcional)
- ❌ Removido `nombre` (reemplazado por first_name y last_name)

##### SignInDto (`src/auths/application/dto/sign-in.dto.ts`)
- ✅ Soporte para login con `email` o `username`
- ✅ Validación condicional: al menos uno de los dos es requerido

##### CreateUsuarioDto (`src/auths/dto/create-usuario.dto.ts`)
- ✅ Agregado `username`
- ✅ Agregado `passwordHash`
- ✅ Agregado `firstName`
- ✅ Agregado `lastName`
- ✅ Agregado `phone`
- ✅ Agregado `avatar`
- ✅ Agregado `bio`
- ✅ Agregado `status`
- ✅ Agregado `isVerified`

#### 2. **Entidad User Actualizada** (`src/auths/domain/entities/user.entity.ts`)

Ahora incluye todos los campos de la tabla `usuarios`:
- `id`, `externalId` (clerk_id), `username`, `email`, `passwordHash`
- `firstName`, `lastName`, `rolId`
- `avatar`, `coverImage`, `bio`, `website`, `location`, `phone`, `birthDate`
- `status`, `isVerified`, `onlineStatus`, `lastLogin`
- `createdAt`, `updatedAt`

#### 3. **Repositorio Actualizado**

##### UserRepository Interface
- ✅ `findByUsername(username: string)` - Buscar por username
- ✅ `findByEmailOrUsername(identifier: string)` - Buscar por email o username

##### PgUserRepository Implementation
- ✅ Método `create()` actualizado con todos los campos
- ✅ Método `rowToUser()` actualizado para mapear todos los campos
- ✅ Implementados métodos `findByUsername()` y `findByEmailOrUsername()`

#### 4. **Use Cases Actualizados**

##### SignUpUseCase
- ✅ Hash de contraseña con `bcryptjs`
- ✅ Generación automática de username desde email si no se provee
- ✅ Creación de usuario con todos los campos nuevos
- ✅ Rol por defecto: `4` (comentador)

##### SignInUseCase
- ✅ Soporte para login con email o username
- ✅ Verificación de contraseña hasheada
- ✅ Retorna información completa del usuario en la respuesta

##### CreateUsuarioUseCase
- ✅ Actualizado para usar todos los campos nuevos del DTO

#### 5. **Dependencias**

Se agregó a `package.json`:
```json
"devDependencies": {
  "@types/bcryptjs": "^2.4.6"
}
```

**Nota:** Ya existe `bcryptjs` en las dependencias del proyecto.

### Estructura de la Base de Datos

La tabla `usuarios` en PostgreSQL tiene la siguiente estructura:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  clerk_id VARCHAR(255) UNIQUE,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  rol_id INTEGER REFERENCES roles(id),
  avatar TEXT,
  cover_image TEXT,
  bio TEXT,
  website VARCHAR(255),
  location VARCHAR(100),
  phone VARCHAR(20),
  birth_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  is_verified BOOLEAN DEFAULT FALSE,
  online_status VARCHAR(20) DEFAULT 'offline',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Roles y Permisos

#### Roles por Defecto
1. **Administrador** (id: 1) - Control total del sistema
2. **Editor** (id: 2) - Puede crear y editar contenido
3. **Autor** (id: 3) - Puede crear contenido pero necesita aprobación
4. **Comentador** (id: 4) - Solo puede comentar en posts publicados

#### Permisos Disponibles
- `crear_post`
- `editar_post_propio`
- `editar_post_cualquiera`
- `publicar_post`
- `rechazar_post`
- `asignar_roles`
- `comentar`
- `reaccionar`
- `crear_categoria`
- `editar_categoria`
- `eliminar_categoria`

### Triggers Automáticos

Al crear un usuario, se activan automáticamente:
1. Creación de `user_preferences`
2. Creación de `user_stats`
3. Creación de `user_social_links`

### Próximos Pasos

Para completar la integración:

1. **Instalar dependencias de tipos:**
   ```bash
   npm install
   ```

2. **Verificar la base de datos:**
   ```bash
   npm run init-db:dev
   ```

3. **Probar los endpoints:**
   - `auth.signUp` - Registro de usuario
   - `auth.signIn` - Inicio de sesión
   - `usuarios.create` - Crear usuario manualmente
   - `role.create` - Crear rol
   - `permiso.create` - Crear permiso
   - `rolePermiso.assign` - Asignar permiso a rol

### Ejemplo de Uso

#### Sign Up
```typescript
{
  "email": "usuario@example.com",
  "password": "password123",
  "first_name": "Juan",
  "last_name": "Pérez",
  "username": "juanperez",  // opcional
  "phone": "+1234567890"     // opcional
}
```

#### Sign In
```typescript
// Con email
{
  "email": "usuario@example.com",
  "password": "password123"
}

// Con username
{
  "username": "juanperez",
  "password": "password123"
}
```

### Notas Importantes

- ⚠️ El password se hashea automáticamente con bcryptjs (10 rounds)
- ⚠️ El username se genera automáticamente desde el email si no se provee
- ⚠️ El rol por defecto es "comentador" (id: 4)
- ⚠️ El status por defecto es "active"
- ⚠️ isVerified por defecto es false
