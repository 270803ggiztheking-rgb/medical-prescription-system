const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const DB_PATH = path.join(__dirname, 'recetas.db');

class Database {
    constructor() {
        this.db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Error al conectar con la base de datos:', err);
            } else {
                console.log('✓ Conectado a la base de datos SQLite');
                this.initTables();
            }
        });
    }

    initTables() {
        // Tabla de usuarios (doctor)
        this.db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                nombre TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creando tabla users:', err);
            } else {
                console.log('✓ Tabla users lista');
                this.createDefaultUser();
            }
        });

        // Tabla de recetas
        this.db.run(`
            CREATE TABLE IF NOT EXISTS recetas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo TEXT UNIQUE NOT NULL,
                paciente_nombre TEXT NOT NULL,
                paciente_edad INTEGER,
                fecha_consulta DATE NOT NULL,
                diagnostico TEXT NOT NULL,
                medicamentos TEXT NOT NULL,
                indicaciones TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creando tabla recetas:', err);
            } else {
                console.log('✓ Tabla recetas lista');
            }
        });
    }

    async createDefaultUser() {
        const defaultUsername = 'admin';
        const defaultPassword = 'DrMiranda2026!';
        
        this.db.get('SELECT * FROM users WHERE username = ?', [defaultUsername], async (err, row) => {
            if (err) {
                console.error('Error verificando usuario:', err);
                return;
            }
            
            if (!row) {
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                this.db.run(
                    'INSERT INTO users (username, password, nombre) VALUES (?, ?, ?)',
                    [defaultUsername, hashedPassword, 'Dr. Manuel Andrés Miranda Guillermo'],
                    (err) => {
                        if (err) {
                            console.error('Error creando usuario por defecto:', err);
                        } else {
                            console.log('✓ Usuario admin creado');
                            console.log('  Username: admin');
                            console.log('  Password: DrMiranda2026!');
                        }
                    }
                );
            }
        });
    }

    // Métodos para usuarios
    async authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
                if (err) {
                    reject(err);
                } else if (!row) {
                    resolve(null);
                } else {
                    const match = await bcrypt.compare(password, row.password);
                    resolve(match ? row : null);
                }
            });
        });
    }

    // Métodos para recetas
    createReceta(receta) {
        return new Promise((resolve, reject) => {
            const { codigo, paciente_nombre, paciente_edad, fecha_consulta, diagnostico, medicamentos, indicaciones } = receta;
            
            this.db.run(
                `INSERT INTO recetas (codigo, paciente_nombre, paciente_edad, fecha_consulta, diagnostico, medicamentos, indicaciones)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [codigo, paciente_nombre, paciente_edad, fecha_consulta, diagnostico, JSON.stringify(medicamentos), indicaciones],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID, codigo });
                    }
                }
            );
        });
    }

    getRecetaByCodigo(codigo) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM recetas WHERE codigo = ?', [codigo], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    row.medicamentos = JSON.parse(row.medicamentos);
                    resolve(row);
                } else {
                    resolve(null);
                }
            });
        });
    }

    getAllRecetas() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM recetas ORDER BY created_at DESC', [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    rows.forEach(row => {
                        row.medicamentos = JSON.parse(row.medicamentos);
                    });
                    resolve(rows);
                }
            });
        });
    }

    updateReceta(codigo, updates) {
        return new Promise((resolve, reject) => {
            const { paciente_nombre, paciente_edad, fecha_consulta, diagnostico, medicamentos, indicaciones } = updates;
            
            this.db.run(
                `UPDATE recetas 
                 SET paciente_nombre = ?, paciente_edad = ?, fecha_consulta = ?, 
                     diagnostico = ?, medicamentos = ?, indicaciones = ?, updated_at = CURRENT_TIMESTAMP
                 WHERE codigo = ?`,
                [paciente_nombre, paciente_edad, fecha_consulta, diagnostico, JSON.stringify(medicamentos), indicaciones, codigo],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ changes: this.changes });
                    }
                }
            );
        });
    }

    deleteReceta(codigo) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM recetas WHERE codigo = ?', [codigo], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error cerrando la base de datos:', err);
            } else {
                console.log('Base de datos cerrada');
            }
        });
    }
}

module.exports = new Database();
