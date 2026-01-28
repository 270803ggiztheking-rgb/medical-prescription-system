# Portal del Consultorio - Información de Despliegue

## ✅ Sitio Web Desplegado Exitosamente

### 🌐 URL del Sitio

**<http://76.13.25.51>**

### 📋 Información del Consultorio

- **Nombre:** Dr. Manuel Andrés Miranda Guillermo
- **Especialidad:** Ginecología y Obstetricia
- **Centro:** Centro de Colposcopía de Mérida
- **Cédula Profesional:** 12159299
- **Cédula de Especialidad:** 14893137

### 📍 Ubicación

- **Dirección:** Av.51 #391 x 56 y 58, Francisco de Montejo, Mérida, Yucatán

### 📞 Contacto

- **Celular:** 981-158-00-36
- **Teléfono:** 9992-87-41-61
- **Email:** <mamg_1793@hotmail.com>

### 🕐 Horarios

- **Lunes a Viernes:** 4:00 PM - 8:00 PM
- **Sábados y Domingos:** 10:00 AM - 2:00 PM (Previa cita)

---

## 🚀 Características del Sitio

### ✨ Diseño Moderno

- Diseño responsive (funciona en móviles, tablets y computadoras)
- Animaciones suaves y profesionales
- Paleta de colores elegante (azul marino y dorado)
- Tipografía premium (Inter y Playfair Display)

### 📱 Secciones del Sitio

1. **Hero/Inicio** - Presentación principal con llamado a la acción
2. **Servicios** - 6 servicios especializados:
   - Consulta Ginecológica
   - Colposcopía
   - Control Prenatal
   - Ultrasonido Obstétrico
   - Planificación Familiar
   - Cirugía Ginecológica
3. **Sobre el Doctor** - Información profesional y credenciales
4. **Contacto** - Formulario de contacto y ubicación
5. **Footer** - Información de contacto rápido

### 🔧 Funcionalidades

- **Formulario de Contacto:** Envía solicitudes directamente a WhatsApp
- **Navegación Suave:** Scroll animado entre secciones
- **Menú Móvil:** Menú hamburguesa para dispositivos móviles
- **Optimización SEO:** Meta tags y estructura semántica
- **Compresión Gzip:** Carga rápida del sitio
- **Headers de Seguridad:** Protección XSS y clickjacking

---

## 🖥️ Configuración del Servidor

### Servidor VPS

- **IP:** 76.13.25.51
- **Sistema:** Ubuntu con Nginx
- **Puerto:** 80 (HTTP)

### Archivos Desplegados

```
/var/www/consultorio/
├── index.html      (Página principal)
├── styles.css      (Estilos)
└── script.js       (JavaScript interactivo)
```

### Configuración Nginx

- Ubicación: `/etc/nginx/sites-available/consultorio`
- Compresión Gzip habilitada
- Cache de assets estáticos (1 año)
- Headers de seguridad configurados

---

## 📱 Código QR

El código QR del comprobante de pago debe apuntar a:

```
http://76.13.25.51
```

---

## 🔄 Próximos Pasos Recomendados

1. **Dominio Personalizado** (Opcional)
   - Registrar un dominio como `drmiranda.com.mx`
   - Configurar DNS para apuntar a 76.13.25.51
   - Instalar certificado SSL (HTTPS)

2. **Certificado SSL** (Recomendado)
   - Instalar Let's Encrypt para HTTPS
   - Comando: `certbot --nginx`

3. **Contenido Adicional**
   - Agregar fotos reales del consultorio
   - Agregar foto del doctor
   - Testimonios de pacientes

4. **Integración WhatsApp**
   - Ya configurado: 5219811580036
   - El formulario envía mensajes directamente a WhatsApp

---

## 📊 Estado del Despliegue

✅ Sitio web creado
✅ Archivos transferidos al VPS
✅ Nginx configurado
✅ Sitio accesible en <http://76.13.25.51>
✅ Formulario de contacto funcional
✅ Diseño responsive
✅ Optimización de rendimiento

---

## 🛠️ Comandos Útiles

### Reiniciar Nginx

```bash
ssh root@76.13.25.51
systemctl restart nginx
```

### Ver logs de Nginx

```bash
ssh root@76.13.25.51
tail -f /var/log/nginx/access.log
```

### Actualizar archivos del sitio

```bash
scp -r /ruta/local/* root@76.13.25.51:/var/www/consultorio/
```

---

**Fecha de Despliegue:** 28 de Enero de 2026
**Estado:** ✅ ACTIVO Y FUNCIONANDO
