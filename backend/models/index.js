const sql = require('mssql');
const poolPromise = require('../config/dbConfig');

const getUsers = async () => {
  const pool = await poolPromise;
  return pool.request().query('SELECT * FROM Users');
};

const getUserById = async (id) => {
  const pool = await poolPromise;
  return pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Users WHERE Id = @id');
};

const createUser = async (user) => {
  const pool = await poolPromise;
  const { name, email } = user;
  return pool.request()
    .input('name', sql.VarChar, name)
    .input('email', sql.VarChar, email)
    .query('INSERT INTO Users (Name, Email) VALUES (@name, @email)');
};

const updateUser = async (id, user) => {
  const pool = await poolPromise;
  const { name, email } = user;
  return pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.VarChar, name)
    .input('email', sql.VarChar, email)
    .query('UPDATE Users SET Name = @name, Email = @email WHERE Id = @id');
};

const deleteUser = async (id) => {
  const pool = await poolPromise;
  return pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Users WHERE Id = @id');
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
