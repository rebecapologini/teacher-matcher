const express = require("express");
   const morgan = require("morgan");
   const session = require("express-session");
   const { sequelize } = require("./db/models");
   require("dotenv").config();
   const { initializeDbConnection, pgPool } = require("./configs/db");
   const { sessionConfig } = require("./configs/session");
   const authRoutes = require("./routes/auth");
   const userRoutes = require("./routes/user");
   const todoRoutes = require("./routes/todo");
   const uploadRoutes = require('./routes/upload');
   const authMiddleware = require("./middlewares/auth");
   const uniRoutes = require('./routes/univercity')
   const setupCors = require("./middlewares/cors");
   const path = require('path');
   const app = express();
   const vkRoutes = require('./routes/univercity');
   initializeDbConnection(pgPool);
   setupCors(app);

   app.use((req, res, next) => {
 
     res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     );
     res.header("Access-Control-Allow-Credentials", "true");
     next();
   });
   app.use(morgan("dev"));
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(session(sessionConfig(pgPool)));
   // Serve static files from the public directory
   app.use(express.static('public'));
   app.use('/uploads', express.static(path.join(__dirname,'public/uploads')))
   app.use("/api/auth", authRoutes);
  //  app.use(authMiddleware);
   app.use("/api/users", userRoutes);
   app.use("/api/todos", todoRoutes);
   app.use("/api", uploadRoutes);
   app.use('/api/vk', vkRoutes);
   app.use('/', uniRoutes)
   const PORT = process.env.PORT || 4000;

   app.listen(PORT, async () => {
     console.log(`Server is running on port ${PORT}`);
     await sequelize.authenticate();
     console.log("Database connected!");
   });