const bcrypt = require("bcrypt");
const { Strategy } = require("passport-local");
const usersServices = require("../../services/users.services");
const boom = require("@hapi/boom");

const localStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await usersServices.listOne(username.toLocaleLowerCase());
    if (!user) {
      done(boom.notFound("Usuario no existe"), false);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      done(boom.unauthorized("Usuario o contraseña incorrecto"), false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = localStrategy;
