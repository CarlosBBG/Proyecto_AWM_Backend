const ConductorController = require('../controllers/conductor.controller');
const { protect, admin } = require('../middleware/protect');

module.exports = function(app) {
    app.post('/conductores', protect, admin,ConductorController.createConductor);
    app.get('/conductores', protect, admin, ConductorController.getConductores);
    app.get('/conductores/:id', protect, ConductorController.getConductorConRuta);
    app.put('/conductores/:id', protect, admin,ConductorController.updateConductor);
    app.get('/conductores/:id/paradas', protect, ConductorController.getParadasConductor);
    app.delete('/conductores/:id', protect, admin,ConductorController.deleteConductor);

}