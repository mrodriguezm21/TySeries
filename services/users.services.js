const Model = require("../schemas/users.schema");
const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");

const addUser = async (user) => {
  const { username, password, name } = user;
  if (!username || !password || !name) {
    throw boom.badRequest("Missing required fields");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const usernameToLowerCase = username.toLowerCase();
  const newUser = {
    ...user,
    username: usernameToLowerCase,
    password: hashedPassword,
    created_at: Date.now(),
  };

  const exist = await Model.findOne({ username: newUser.username });
  if (exist) {
    throw boom.conflict("Username already exists");
  }

  try {
    const myUser = new Model(newUser);
    return await myUser.save();
  } catch (error) {
    throw boom.badImplementation("Internal server error");
  }
};

const getUsers = async () => {
  try {
    return await Model.find();
  } catch (error) {
    throw boom.badImplementation("Internal server error");
  }
};

const getUser = async (username) => {
  try {
    const user = await Model.findOne({ username });
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  } catch (error) {
    throw boom.notFound("User not found");
  }
};

const updateUser = async (id, user) => {
  const newUser = {
    ...user,
    created_at: Date.now(),
  };
  try {
    const updatedUser = await Model.findByIdAndUpdate(id, newUser, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw boom.notFound("User not found");
  }
};

module.exports = {
  create: addUser,
  list: getUsers,
  listOne: getUser,
  update: updateUser,
};
