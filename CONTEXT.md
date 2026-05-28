# IS-Back — Contexto del Proyecto

## Stack Tecnológico

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **ORM:** Sequelize (MySQL / MSSQL)
- **Auth:** JWT (`jsonwebtoken`) + BCrypt
- **Jobs:** node-cron
- **Docs:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Archivos Excel:** xlsx
- **HTTP cliente:** axios
- **Zona horaria DB:** UTC-5 (Colombia)

---

## Arquitectura General

Backend REST multi-tenant. Cada cliente (`Client`) tiene empresas (`Company`), usuarios (`User`), módulos habilitados (`ModuleClient`) y datos de dashboard (`Data` → `DataDetail`).

Los módulos representan áreas funcionales (Nómina, Producción, Laboratorio, etc.). La app redirige a aplicaciones legacy en ASP.NET mediante SSO con JWT.

```
Client (1) ──→ (N) User
Client (1) ──→ (N) Company
Client (1) ──→ (N) Data ──→ (N) DataDetail
Client (1) ──→ (N) ModuleClient ──→ (1) Module
Client (1) ──→ (N) Record
```

---

## Módulos y Endpoints

### AUTH — `/api/auth`
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/login` | Login con usuario/contraseña, retorna JWT (2h) |
| POST | `/insert` | Crear nuevo usuario |

- BCrypt con salt 7
- JWT incluye: `id`, `clientId`, `username`, `type`, `company`
- Valida existencia del cliente por `identification` antes del login

---

### CLIENT — `/api/client` (mayormente protegido)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/list` | Listar todos los clientes |
| GET | `/get/:id` | Obtener cliente por ID |
| POST | `/insert` | Crear cliente (genera UUID) |
| PUT | `/update/:id` | Actualizar cliente |
| PUT | `/enable/:id` | Activar cliente |
| PUT | `/disable/:id` | Desactivar cliente |

- Al crear un cliente se asignan automáticamente TODOS los módulos existentes (estado `false`)
- Tipos de cliente: `PALMA`, `EXTRACTURA`, `BANANO`
- Valida NIT/identificación única

---

### COMPANY — `/api/company`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/list` | Listar empresas |
| GET | `/listbyclient/:id` | Empresas de un cliente |
| GET | `/get/:id` | Detalle de empresa |
| POST | `/insert` | Crear empresa |

- Vinculada a un cliente via `clientId`
- Campo `numberId`: código numérico usado en jobs de producción

---

### DATA — `/api/data`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/list` | Listar series de datos |
| GET | `/listbyclient/:id` | Series de un cliente |
| GET | `/get/:id` | Detalle de serie |
| POST | `/insert` | Crear serie |

- `product`: valores separados por coma (ej: `"CPO,FRU"`)
- Agrupa DataDetails para visualización en dashboard

---

### DASHBOARD / DATA DETAIL — `/api/dashboard`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/datadetailsbydata/:id?company=` | Puntos de datos de una serie |
| GET | `/listbyclient/:id?option=&company=` | Datos agregados para dashboard |
| GET | `/list` | Listar dashboards |
| GET | `/get?id=` | Detalle de dashboard |
| POST | `/insert` | Crear dashboard |
| POST | `/update` | Actualizar nombre |
| POST | `/delete` | Eliminar dashboard |

- `option` acepta: `DAY` (últimos 30 días), `MONTH` (últimos 12 meses, SUM), `YEAR` (todo, SUM)
- Retorna estructura: `[{ title: "producto", data: [...] }]`
- `xValue` = fecha, `yValue` = valor numérico

---

### MODULE — `/api/module`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/list` | Listar módulos del sistema |
| GET | `/get?id=` | Obtener módulo |
| POST | `/insert` | Crear módulo |
| POST | `/delete` | Eliminar módulo |

Módulos disponibles (seeder):
`Producción`, `Laboratorio`, `Logistic`, `Casino`, `Administración`, `Contabilidad`, `Báscula`, `Nómina`, `Mantenimiento`, `Automatización`, `Agronomía`, `Tarima`, `Reception`

---

### MODULE CLIENT — `/api/moduleclient`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/list` | Todas las asociaciones |
| GET | `/listbyclient?id=` | Módulos de un cliente |
| GET | `/activeModules?id=` | Solo módulos activos del cliente |
| POST | `/insert` | Activar módulo para cliente |
| DELETE | `/delete` | Desactivar módulo para cliente |

- Unique constraint: `(clientId, moduleId)`
- `state = true` → activo, `state = false` → inactivo

---

### RECORD — `/api/record`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/list` | Listar registros (JOIN con User y Module) |
| GET | `/get?id=` | Detalle de registro |
| POST | `/insert` | Crear entrada de auditoría |

- Trazabilidad de documentos procesados
- Campos: `fileName`, `clientId`, `userId`, `moduleId`, `notes`, `state`

---

### REDIRECTION — `/api/redirection` (protegido)
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/redirecttomodule/:module?company=` | URL firmada con JWT hacia módulo legacy |
| GET | `/redirecttodashboard` | URL hacia dashboard legacy |

- Construye URLs a aplicaciones ASP.NET legacy
- Patrón: `http://qa-is-ov-{clientName}.infxsolution.com/{module}/...?company=&token=`
- Módulo `tarima` tiene endpoint diferente
- Implementa SSO via token JWT

---

### PLAIN FILES — `/api/plain`
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/upload` | Subir archivo Excel (multipart/form-data) |
| DELETE | `/delete/:filename` | Eliminar archivo del disco |

- Conversión de Excel a archivos planos de texto en formato propietario
- Documentos soportados: **Nómina** (`PlanoNominaService`) e **Insumos** (`PlanoSalidaInsumosService`)
- Utilidades en `CellOperations.js`: padding, validación de longitud, formateo de fechas, limpieza de strings

---

## Middleware

### `authMiddleware.js`
- Header: `Authorization: Bearer {token}`
- `403` si no hay token, `401` si es inválido
- Adjunta `req.user = { id, clientId, name, type, company }`

---

## Jobs en Segundo Plano

| Archivo | Frecuencia | Función |
|---------|-----------|---------|
| `synchronizeUsers.js` | Cada 30 min | Sincroniza usuarios desde API .NET externa |
| `synchronizeData.js` | Cada 2 min | Sincroniza series de datos desde servicio externo |
| `productionDailyByProduct.js` | Cada 15 min | Métricas diarias de producción (`CPO`) |
| `recivedDailyByProduct.js` | Cada 15 min | Métricas diarias de recepción (`FRU`) |

- Los jobs de producción/recepción están **comentados** en `app.js` (no activos por defecto)
- `synchronizeData` y `synchronizeUsers` también comentados

---

## Variables de Entorno Necesarias

```env
PORT=7000
JWT_SECRET=...
DB_HOST=...
DB_PORT=...
DB_NAME=...
DB_USER=...
DB_PASS=...
DB_DIALECT=mysql   # o mssql
ALLOWED_ORIGINS=http://localhost:3000,...   # para producción
```

---

## Notas Importantes

- Los archivos subidos se guardan en `files/` con nombre UUID (`.txt`)
- La carpeta `parameters/accountparameters.js` contiene parámetros de cuentas contables para los planos
- Swagger disponible en `/api-docs`
- `app.js` actualmente usa `cors()` sin restricciones (apto solo para desarrollo)
