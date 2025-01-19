// controllers/authController.js
const { Administrador, Conductor, Estudiante } = require('../models');
// const bcrypt = require('bcrypt'); // (Opcional si usas contraseñas encriptadas)

module.exports.login = async (req, res) => {
  // Renombramos 'password' que viene del body a 'bodyPassword'
  const { correo, password: bodyPassword } = req.body; 

  try {
    // 1. Buscar primero en la tabla Administradores
    let user = await Administrador.findOne({ where: { correo } });
    if (user) {
      // Si se encontró en administradores
      // Comparar contraseñas en texto plano:
      if (user.password !== bodyPassword) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      // Con bcrypt (opcional):
      // const match = await bcrypt.compare(bodyPassword, user.password);
      // if (!match) return res.status(401).json({ message: 'Correo o contraseña incorrectos' });

      // Renombramos 'password' del usuario a 'adminPass' al destructurar
      const { password: adminPass, ...adminSinPassword } = user.toJSON();
      // Retorna con un campo "role" indicando que es admin
      return res.status(200).json({ ...adminSinPassword, role: 'admin' });
    }

    // 2. Si no está en admins, buscar en la tabla Conductores
    user = await Conductor.findOne({ where: { correo } });
    if (user) {
      // Si se encontró en conductores
      if (user.password !== bodyPassword) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      // Con bcrypt (opcional):
      // const match = await bcrypt.compare(bodyPassword, user.password);
      // if (!match) return res.status(401).json({ message: 'Correo o contraseña incorrectos' });

      // Renombramos 'password' del usuario a 'condPass' al destructurar
      const { password: condPass, ...conductorSinPassword } = user.toJSON();
      return res.status(200).json({ ...conductorSinPassword, role: 'conductor' });
    }

    // 3. Si no está en admins ni conductores, buscar en la tabla Estudiantes
    user = await Estudiante.findOne({ where: { correo } });
    if (user) {
      // Si se encontró en estudiantes
      if (user.password !== bodyPassword) {
        return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
      }

      // Con bcrypt (opcional):
      // const match = await bcrypt.compare(bodyPassword, user.password);
      // if (!match) return res.status(401).json({ message: 'Correo o contraseña incorrectos' });

      // Renombramos 'password' del usuario a 'estPass' al destructurar
      const { password: estPass, ...estudianteSinPassword } = user.toJSON();
      return res.status(200).json({ ...estudianteSinPassword, role: 'estudiante' });
    }

    // 4. Si no coincide con ninguno
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
