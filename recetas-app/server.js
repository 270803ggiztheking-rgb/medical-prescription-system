const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const { customAlphabet } = require('nanoid');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Generar códigos únicos de 8 caracteres
const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de sesiones
app.use(session({
    secret: 'recetas-medicas-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Cambiar a true si usas HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Middleware de autenticación
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
}

// ===== RUTAS DE AUTENTICACIÓN =====

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
        }

        const user = await db.authenticateUser(username, password);

        if (user) {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.nombre = user.nombre;
            res.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    nombre: user.nombre
                }
            });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: 'Error al cerrar sesión' });
        } else {
            res.json({ success: true });
        }
    });
});

// Verificar sesión
app.get('/api/check-session', (req, res) => {
    if (req.session && req.session.userId) {
        res.json({
            authenticated: true,
            user: {
                id: req.session.userId,
                username: req.session.username,
                nombre: req.session.nombre
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

// ===== RUTAS DE RECETAS =====

// Crear nueva receta
app.post('/api/recetas', requireAuth, async (req, res) => {
    try {
        const { paciente_nombre, paciente_edad, fecha_consulta, diagnostico, medicamentos, indicaciones } = req.body;

        // Validaciones
        if (!paciente_nombre || !fecha_consulta || !diagnostico || !medicamentos) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // Generar código único
        const codigo = nanoid();

        // Crear receta en la base de datos
        const result = await db.createReceta({
            codigo,
            paciente_nombre,
            paciente_edad: paciente_edad || null,
            fecha_consulta,
            diagnostico,
            medicamentos,
            indicaciones: indicaciones || ''
        });

        // Generar QR code
        const qrUrl = `${req.protocol}://${req.get('host')}/receta.html?codigo=${codigo}`;
        const qrDataUrl = await QRCode.toDataURL(qrUrl);

        res.json({
            success: true,
            receta: {
                id: result.id,
                codigo: result.codigo,
                qr: qrDataUrl,
                url: qrUrl
            }
        });
    } catch (error) {
        console.error('Error creando receta:', error);
        res.status(500).json({ error: 'Error al crear la receta' });
    }
});

// Obtener todas las recetas (solo admin)
app.get('/api/recetas', requireAuth, async (req, res) => {
    try {
        const recetas = await db.getAllRecetas();
        res.json({ success: true, recetas });
    } catch (error) {
        console.error('Error obteniendo recetas:', error);
        res.status(500).json({ error: 'Error al obtener recetas' });
    }
});

// Obtener receta por código (público)
app.get('/api/recetas/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        const receta = await db.getRecetaByCodigo(codigo);

        if (receta) {
            res.json({ success: true, receta });
        } else {
            res.status(404).json({ error: 'Receta no encontrada' });
        }
    } catch (error) {
        console.error('Error obteniendo receta:', error);
        res.status(500).json({ error: 'Error al obtener la receta' });
    }
});

// Actualizar receta
app.put('/api/recetas/:codigo', requireAuth, async (req, res) => {
    try {
        const { codigo } = req.params;
        const updates = req.body;

        const result = await db.updateReceta(codigo, updates);

        if (result.changes > 0) {
            res.json({ success: true, message: 'Receta actualizada' });
        } else {
            res.status(404).json({ error: 'Receta no encontrada' });
        }
    } catch (error) {
        console.error('Error actualizando receta:', error);
        res.status(500).json({ error: 'Error al actualizar la receta' });
    }
});

// Eliminar receta
app.delete('/api/recetas/:codigo', requireAuth, async (req, res) => {
    try {
        const { codigo } = req.params;
        const result = await db.deleteReceta(codigo);

        if (result.changes > 0) {
            res.json({ success: true, message: 'Receta eliminada' });
        } else {
            res.status(404).json({ error: 'Receta no encontrada' });
        }
    } catch (error) {
        console.error('Error eliminando receta:', error);
        res.status(500).json({ error: 'Error al eliminar la receta' });
    }
});

// Regenerar QR para una receta
app.get('/api/recetas/:codigo/qr', requireAuth, async (req, res) => {
    try {
        const { codigo } = req.params;
        const receta = await db.getRecetaByCodigo(codigo);

        if (!receta) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        const qrUrl = `${req.protocol}://${req.get('host')}/receta.html?codigo=${codigo}`;
        const qrDataUrl = await QRCode.toDataURL(qrUrl);

        res.json({ success: true, qr: qrDataUrl, url: qrUrl });
    } catch (error) {
        console.error('Error generando QR:', error);
        res.status(500).json({ error: 'Error al generar QR' });
    }
});

// ===== RUTAS DE PÁGINAS =====

// Redirigir /admin a /admin/login.html
app.get('/admin', (req, res) => {
    res.redirect('/admin/login.html');
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🏥 Sistema de Recetas Médicas Digitales');
    console.log('='.repeat(50));
    console.log(`✓ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`✓ Panel Admin: http://localhost:${PORT}/admin`);
    console.log(`✓ Ver Receta: http://localhost:${PORT}/receta.html?codigo=[CODIGO]`);
    console.log('='.repeat(50));
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
    console.log('\n\nCerrando servidor...');
    db.close();
    process.exit(0);
});
