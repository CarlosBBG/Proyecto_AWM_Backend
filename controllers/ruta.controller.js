const Ruta = require('../models/ruta.model');

module.exports.getAllRutas = async (req, res) => {
    try {
        const rutas = await Ruta.findAll();
        return res.status(200).json(rutas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getRuta = async (req, res) => {
    const { id } = req.params;
    try {
        const ruta = await Ruta.findByPk(id);
        if (!ruta) {
            return res.status(404).json({ message: 'Ruta no encontrada' });
        }
        return res.status(200).json(ruta);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}