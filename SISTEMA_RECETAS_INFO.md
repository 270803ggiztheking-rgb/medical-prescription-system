# Sistema de Recetas Médicas Digitales - DESPLEGADO ✅

## 🎉 Sistema Completamente Funcional

El sistema de recetas médicas digitales ha sido desplegado exitosamente en el VPS.

---

## 🌐 URLs de Acceso

### Portal Principal del Consultorio

**URL:** <http://76.13.25.51>

- Sitio web informativo del consultorio
- Información de servicios
- Formulario de contacto

### Panel de Administración (Doctor)

**URL:** <http://76.13.25.51/admin>

**Credenciales de Acceso:**

- **Usuario:** `admin`
- **Contraseña:** `DrMiranda2026!`

### Ver Receta (Pacientes)

**URL:** <http://76.13.25.51/receta.html?codigo=[CODIGO>]

- Los pacientes acceden mediante el código QR
- Cada receta tiene un código único de 8 caracteres

---

## 📋 Funcionalidades del Sistema

### Panel de Administración

#### 1. Dashboard (<http://76.13.25.51/admin/dashboard.html>)

- ✅ Lista de todas las recetas creadas
- ✅ Estadísticas (total de recetas, recetas del día)
- ✅ Búsqueda por nombre de paciente o código
- ✅ Acciones: Ver, Generar QR, Eliminar

#### 2. Crear Receta (<http://76.13.25.51/admin/crear-receta.html>)

- ✅ Formulario completo para crear recetas
- ✅ Información del paciente (nombre, edad, fecha)
- ✅ Diagnóstico
- ✅ Medicamentos (múltiples, con dosis, frecuencia, duración)
- ✅ Indicaciones generales
- ✅ Generación automática de código único
- ✅ Generación automática de código QR
- ✅ Descarga del QR en formato PNG

### Portal del Paciente

#### Visualización de Receta

- ✅ Diseño profesional tipo receta médica oficial
- ✅ Información del doctor con cédulas
- ✅ Datos del paciente
- ✅ Diagnóstico destacado
- ✅ Lista de medicamentos con detalles
- ✅ Indicaciones generales
- ✅ Información de contacto del consultorio
- ✅ Botón de impresión optimizado
- ✅ Diseño responsive (móvil, tablet, desktop)

---

## 🔧 Arquitectura Técnica

### Backend

- **Framework:** Node.js + Express
- **Base de Datos:** SQLite (archivo: recetas.db)
- **Puerto:** 3000 (interno)
- **Proceso:** PM2 (recetas-app)

### Frontend

- **Admin:** HTML5 + CSS3 + JavaScript vanilla
- **Paciente:** HTML5 + CSS3 + JavaScript vanilla
- **Fuentes:** Inter, Playfair Display (Google Fonts)

### Servidor

- **Web Server:** Nginx (proxy reverso)
- **Puerto Público:** 80 (HTTP)
- **VPS:** 76.13.25.51

---

## 📊 Base de Datos

### Tabla: users

```sql
- id (INTEGER PRIMARY KEY)
- username (TEXT UNIQUE)
- password (TEXT) -- encriptado con bcrypt
- nombre (TEXT)
- created_at (DATETIME)
```

### Tabla: recetas

```sql
- id (INTEGER PRIMARY KEY)
- codigo (TEXT UNIQUE) -- 8 caracteres
- paciente_nombre (TEXT)
- paciente_edad (INTEGER)
- fecha_consulta (DATE)
- diagnostico (TEXT)
- medicamentos (TEXT) -- JSON array
- indicaciones (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

---

## 🔐 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Sesiones con express-session
- ✅ Códigos únicos aleatorios (8 caracteres)
- ✅ Headers de seguridad (XSS, Clickjacking)
- ✅ Validación de entrada en formularios
- ✅ Autenticación requerida para panel admin

---

## 📱 Flujo de Trabajo

### Para el Doctor

1. **Acceder al panel:** <http://76.13.25.51/admin>
2. **Iniciar sesión** con las credenciales
3. **Crear nueva receta:**
   - Click en "Nueva Receta"
   - Llenar datos del paciente
   - Agregar diagnóstico
   - Agregar medicamentos (uno o varios)
   - Agregar indicaciones (opcional)
   - Click en "Crear Receta"
4. **Obtener QR:**
   - El sistema genera automáticamente un código único
   - Se muestra el código QR
   - Descargar el QR como imagen PNG
5. **Imprimir el QR** en el comprobante de pago del paciente

### Para el Paciente

1. **Recibir comprobante** de pago con código QR
2. **Escanear el QR** con el celular
3. **Ver la receta** en el navegador
4. **Imprimir o guardar** la receta si es necesario

---

## 🛠️ Comandos Útiles

### Ver logs de la aplicación

```bash
ssh root@76.13.25.51
pm2 logs recetas-app
```

### Reiniciar la aplicación

```bash
ssh root@76.13.25.51
pm2 restart recetas-app
```

### Ver estado de la aplicación

```bash
ssh root@76.13.25.51
pm2 status
```

### Reiniciar Nginx

```bash
ssh root@76.13.25.51
systemctl restart nginx
```

### Acceder a la base de datos

```bash
ssh root@76.13.25.51
cd /var/www/recetas-app
sqlite3 recetas.db
```

Comandos SQLite útiles:

```sql
.tables                          -- Ver tablas
SELECT * FROM recetas;           -- Ver todas las recetas
SELECT * FROM users;             -- Ver usuarios
.exit                            -- Salir
```

---

## 📦 Archivos del Proyecto

### En el VPS (/var/www/recetas-app/)

```
recetas-app/
├── server.js              -- Servidor Express
├── database.js            -- Módulo de base de datos
├── package.json           -- Dependencias
├── recetas.db             -- Base de datos SQLite
├── node_modules/          -- Dependencias instaladas
└── public/
    ├── admin/
    │   ├── login.html     -- Login del doctor
    │   ├── dashboard.html -- Dashboard principal
    │   ├── crear-receta.html -- Formulario de recetas
    │   ├── admin.css      -- Estilos del admin
    │   └── admin.js       -- JavaScript del admin
    ├── receta.html        -- Vista de receta para pacientes
    └── receta.css         -- Estilos de la receta
```

### En local (/home/kali/consultorio-drmiranda/)

```
consultorio-drmiranda/
├── index.html             -- Sitio principal
├── styles.css             -- Estilos del sitio
├── script.js              -- JavaScript del sitio
├── DEPLOYMENT_INFO.md     -- Info del sitio principal
└── recetas-app/           -- Sistema de recetas
    └── (mismos archivos que en el VPS)
```

---

## 🔄 Actualizar el Sistema

### Actualizar código en el VPS

```bash
# Desde tu máquina local
scp -r /home/kali/consultorio-drmiranda/recetas-app/* root@76.13.25.51:/var/www/recetas-app/

# Reiniciar la aplicación
ssh root@76.13.25.51 'pm2 restart recetas-app'
```

---

## 🎨 Personalización

### Cambiar contraseña del admin

```bash
ssh root@76.13.25.51
cd /var/www/recetas-app
sqlite3 recetas.db

# Dentro de SQLite, necesitarás generar un nuevo hash bcrypt
# Es más fácil hacerlo desde Node.js:
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('NUEVA_CONTRASEÑA', 10, (err, hash) => console.log(hash));"

# Copiar el hash y actualizar en la base de datos:
UPDATE users SET password = 'HASH_GENERADO' WHERE username = 'admin';
.exit
```

### Agregar más usuarios

Editar `database.js` y agregar más inserts en `createDefaultUser()`

---

## 📞 Información de Contacto en las Recetas

Las recetas muestran automáticamente:

- **Consultorio:** Av.51 #391 x 56 y 58, Francisco de Montejo, Mérida
- **Teléfonos:** 9992-87-41-61, 981-158-00-36
- **Email:** <mamg_1793@hotmail.com>
- **Horarios:** Lun-Vie 4PM-8PM, Sáb-Dom 10AM-2PM

---

## ✅ Estado del Sistema

**Fecha de Despliegue:** 28 de Enero de 2026, 2:44 AM

### Servicios Activos

- ✅ Sitio web del consultorio (puerto 80)
- ✅ Sistema de recetas (puerto 3000 → proxy 80)
- ✅ Nginx (proxy reverso)
- ✅ PM2 (gestor de procesos)
- ✅ Base de datos SQLite

### URLs Verificadas

- ✅ <http://76.13.25.51> (sitio principal)
- ✅ <http://76.13.25.51/admin> (panel de administración)
- ✅ <http://76.13.25.51/api/check-session> (API funcionando)

---

## 🚀 Próximos Pasos Recomendados

1. **Dominio Personalizado** (Opcional)
   - Registrar dominio como `drmiranda.com.mx`
   - Configurar DNS A record → 76.13.25.51
   - Actualizar configuración de Nginx

2. **Certificado SSL (HTTPS)** (Recomendado)

   ```bash
   ssh root@76.13.25.51
   apt install certbot python3-certbot-nginx
   certbot --nginx -d tudominio.com
   ```

3. **Backups Automáticos**
   - Configurar backup diario de `recetas.db`
   - Guardar en ubicación segura

4. **Monitoreo**
   - Configurar alertas de PM2
   - Monitorear uso de recursos

---

## 🎓 Capacitación

### Video Tutorial (Crear)

Puedes crear un video tutorial mostrando:

1. Cómo iniciar sesión
2. Cómo crear una receta
3. Cómo descargar el QR
4. Cómo los pacientes ven la receta

---

**Sistema desarrollado por:** Antigravity AI
**Fecha:** Enero 2026
**Estado:** ✅ PRODUCCIÓN - COMPLETAMENTE FUNCIONAL
