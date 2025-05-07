const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(authRoutes);
app.use(dashboardRoutes);

sequelize.sync().then(() => {
  app.listen(3001, () => console.log('Servidor rodando em http://localhost:3001'));
});