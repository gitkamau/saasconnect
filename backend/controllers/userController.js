const { parse } = require('querystring');
const userModel = require('../models');

const getUsers = async (req, res) => {
  try {
    const result = await userModel.getUsers();
    res.statusCode = 200;
    res.end(JSON.stringify(result.recordset));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: err.message }));
  }
};

const getUserById = async (req, res, id) => {
  try {
    const result = await userModel.getUserById(id);
    res.statusCode = 200;
    res.end(JSON.stringify(result.recordset[0]));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: err.message }));
  }
};

const createUser = async (req, res) => {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const parsedBody = parse(body);
      await userModel.createUser(parsedBody);
      res.statusCode = 201;
      res.end(JSON.stringify({ message: 'User created' }));
    });
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: err.message }));
  }
};

const updateUser = async (req, res, id) => {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const parsedBody = parse(body);
      await userModel.updateUser(id, parsedBody);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'User updated' }));
    });
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: err.message }));
  }
};

const deleteUser = async (req, res, id) => {
  try {
    await userModel.deleteUser(id);
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'User deleted' }));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: err.message }));
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
