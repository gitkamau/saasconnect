const url = require('url');
const userController = require('../controllers/userController');

const routeHandler = (req, res) => {
  const reqUrl = url.parse(req.url, true);

  // Route: GET /api/users
  if (reqUrl.pathname === '/api/users' && req.method === 'GET') {
    userController.getUsers(req, res);
  }

  // Route: GET /api/users/:id
  else if (reqUrl.pathname.match(/^\/api\/users\/\d+$/) && req.method === 'GET') {
    const id = reqUrl.pathname.split('/')[3];
    userController.getUserById(req, res, id);
  }

  // Route: POST /api/users
  else if (reqUrl.pathname === '/api/users' && req.method === 'POST') {
    userController.createUser(req, res);
  }

  // Route: PUT /api/users/:id
  else if (reqUrl.pathname.match(/^\/api\/users\/\d+$/) && req.method === 'PUT') {
    const id = reqUrl.pathname.split('/')[3];
    userController.updateUser(req, res, id);
  }

  // Route: DELETE /api/users/:id
  else if (reqUrl.pathname.match(/^\/api\/users\/\d+$/) && req.method === 'DELETE') {
    const id = reqUrl.pathname.split('/')[3];
    userController.deleteUser(req, res, id);
  }

  // Route not found
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

module.exports = routeHandler;
