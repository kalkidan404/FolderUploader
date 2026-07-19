const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const methodOverride = require("method-override");
require("dotenv").config();

const passportConfig = require("./config/passport");
const folderRoutes = require("./routes/folderRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

const prisma = new PrismaClient();


passportConfig(passport);


// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// Session
app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        store: new PrismaSessionStore(prisma, {

            checkPeriod: 2 * 60 * 1000,

            dbRecordIdIsSessionId: true,

            dbRecordIdFunction: undefined,

        }),

        cookie: {

            maxAge: 1000 * 60 * 60 * 24,

        },

    })
);


// Passport
app.use(passport.initialize());

app.use(passport.session());


// Current user for EJS
app.use((req, res, next) => {

    res.locals.currentUser = req.user;

    next();

});


// Routes
app.use("/", authRoutes);

app.use("/", homeRoutes);

app.use("/", fileRoutes);
app.use("/", folderRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});