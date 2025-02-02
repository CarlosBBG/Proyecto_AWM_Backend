const EstudianteController = require('../controllers/estudiante.controller');
const { protect } = require('../middleware/protect');

module.exports = function(app) {
    app.post('/estudiantes',protect, EstudianteController.createEstudiante);
    app.get('/estudiantes', EstudianteController.getAllEstudiantes);
    app.get('/estudiantes/:id/paradas', EstudianteController.getParadasEstudiante);
    app.put('/estudiantes/:id/paradas', EstudianteController.updateParadaEstudiante);
    app.get('/estudiantes/:id', EstudianteController.getEstudiante);
    app.put('/estudiantes/:id', EstudianteController.updateEstudiante);
    app.put('/estudiantes/:id/ruta', EstudianteController.updateRutaEstudiante);
}