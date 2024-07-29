const cors = require("cors");

const setupCors = (app) => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: "GET, POST, PUT, DELETE",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      credentials: true,
    })
  );
};

module.exports = setupCors;
