exports.getRoutes = (req, res) => {
  res.send([
    "GET /api/routes",

    "GET /api/clients",
    "GET /api/clients/:id",
    "POST /api/clients",
    "PUT /api/clients/:id",
    "DEL /api/clients/:id",

    "GET /api/clients/history/:id",
    "POST /api/clients/history",

    "GET /api/users",
    "GET /api/users/:id",
    "POST /api/users",
    "PUT /api/users/:id",
    "DEL /api/users/:id",
    
    "POST /api/users/login",
  ]);
};
