const express = require("express");
const cors = require("cors");
const passport = require("passport");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
require('./utils/passport')
const authRoute = require("./routes/auth")
const connectDB = require('./config/db_server')

//Rest obj:
const app = express();

// connect DB:
connectDB()


//Middlewares:
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,  // Enable cookies with credentials
}));

app.use(
  cookieSession({
    name: "session",
    keys: ["indohype"],
    maxAge: 3 * 20 * 60 * 60 * 100,
  })
);

//Config env file:
dotenv.config();

// Passport:
app.use(passport.initialize());
app.use(passport.session());

//Routes:
app.use('/auth', authRoute)

//PORT:
const PORT = process.env.PORT || 8080;

//Listen:
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} `.bgCyan);
});
