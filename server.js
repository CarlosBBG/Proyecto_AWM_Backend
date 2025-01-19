const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

require('./config/sequelize.config');

const EstudianteController = require('./controllers/estudiante.controller');

// Verificar paradas y ajustar asientos al iniciar el servidor
(async () => {
    try {
        console.log('Verificando paradas y ajustando asientos al iniciar el servidor...');
        await EstudianteController.verificarParadasEstudiantes();
        console.log('Ajustes completados.');
    } catch (error) {
        console.error('Error al verificar paradas al iniciar:', error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allConductoresRoutes = require('./routes/conductor.route');
allConductoresRoutes(app);

const allUsuariosRoutes = require('./routes/usuario.route');
allUsuariosRoutes(app);

const allEstudiantesRoutes = require('./routes/estudiante.route');
allEstudiantesRoutes(app);

const allRutasRoutes = require('./routes/ruta.route');
allRutasRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

