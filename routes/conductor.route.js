const ConductorController = require('../controllers/conductor.controller');

module.exports = function(app) {
    app.post('/conductores', ConductorController.createConductor);
    app.get('/conductores', ConductorController.getConductores);
    app.get('/conductores/:id', ConductorController.getConductorConRuta);
    app.put('/conductores/:id', ConductorController.updateConductor);
    app.get('/conductores/:id/paradas', ConductorController.getParadasConductor);

}