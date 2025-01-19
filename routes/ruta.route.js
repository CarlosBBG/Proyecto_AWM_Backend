const RutaController = require('../controllers/ruta.controller');

module.exports = function(app) {
    app.get('/rutas', RutaController.getAllRutas);
    app.get('/rutas/:id', RutaController.getRuta);
}
