const Conductor = require('../models/conductor.model.js');
const Ruta = require('../models/ruta.model.js');
const Parada = require('../models/parada.model.js');

module.exports.createConductor = async (req, res) => {
    const { nombre, apellido, correo, password, cedula, ruta } = req.body;
    try {
        const conductor = await Conductor.create({ nombre, apellido, correo, password, cedula, ruta });
        return res.status(201).json(conductor);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getConductores = async (req, res) => {
    try {
        const conductores = await Conductor.findAll();
        return res.status(200).json(conductores);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.updateConductor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, password, cedula, ruta } = req.body;
    try {
        const conductor = await Conductor.findByPk(id);
        if (!conductor) {
            return res.status(404).json({ message: 'Conductor no encontrado' });
        }
        conductor.nombre = nombre;
        conductor.apellido = apellido;
        conductor.correo = correo;
        conductor.password = password;
        conductor.cedula = cedula;
        conductor.ruta = ruta;
        await conductor.save();
        return res.status(200).json(conductor);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getConductor = async (req, res) => {
    const { id } = req.params;
    try {
        const conductor = await Conductor.findByPk(id);
        if (!conductor) {
            return res.status(404).json({ message: 'Conductor no encontrado' });
        }
        return res.status(200).json(conductor);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getConductorConRuta = async (req, res) => {
    try {
      const conductorId = req.params.id;
      // Buscar por PK e incluir la asociación "rutaData" (definida en belongsTo)
      const conductor = await Conductor.findByPk(conductorId, {
        include: [
          {
            model: Ruta,
            as: 'rutaData'
          }
        ]
      });
  
      if (!conductor) {
        return res.status(404).json({ message: 'Conductor no encontrado' });
      }
  
      // Retornar al frontend
      return res.json(conductor);
    } catch (error) {
      console.error('Error al obtener conductor con ruta:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener todas las paradas de una ruta de un conductor

// Obtener todas las paradas de una ruta asociada a un conductor
module.exports.getParadasConductor = async (req, res) => {
    try {
        const conductorId = req.params.id;

        // Buscar al conductor y la ruta asociada con sus paradas
        const conductor = await Conductor.findByPk(conductorId, {
            include: [
                {
                    model: Ruta,
                    as: 'rutaData', // Asegúrate de que este alias coincida con la asociación en tu modelo
                    include: [
                        {
                            model: Parada,
                            as: 'paradas', // Asegúrate de que este alias coincida con la asociación en tu modelo
                            attributes: ['id', 'nombre'] // Solo devuelve campos relevantes
                        }
                    ]
                }
            ]
        });

        if (!conductor) {
            return res.status(404).json({ message: 'Conductor no encontrado' });
        }

        // Verificar que el conductor tenga una ruta asignada
        if (!conductor.rutaData) {
            return res.status(404).json({ message: 'El conductor no tiene una ruta asignada.' });
        }

        // Retornar solo las paradas
        return res.json({
            ruta: conductor.rutaData.id, // ID de la ruta asociada
            paradas: conductor.rutaData.paradas // Lista de paradas
        });
    } catch (error) {
        console.error('Error al obtener paradas de conductor:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

