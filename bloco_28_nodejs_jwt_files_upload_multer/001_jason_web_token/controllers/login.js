const User = require('../models/user');
const jwt = require('jsonwebtoken');

const { jwt_secret } = process.env;

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });
    }

    const user = await User.findUser(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });
    }

    const jwtConfig = {
      expiresIn: '3d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, jwt_secret, jwtConfig);

    return res.status(200).json({ message: 'Login efetuado com sucesso', token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};
