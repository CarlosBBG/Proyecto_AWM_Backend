const RutaController = require('../controllers/ruta.controller');

module.exports = function(app) {
    app.get('/rutas', RutaController.getRutasConParadas);
    app.get('/rutas/:id', RutaController.getRuta);
    app.post('/rutas', RutaController.createRuta);
    app.put('/rutas/:id', RutaController.updateRuta);
    app.delete('/rutas/:id', RutaController.deleteRuta);
}
