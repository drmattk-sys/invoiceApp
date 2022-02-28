require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const { static } = require("express");
const cookieparser = require("cookie-parser");
const session = require("cookie-session");
const flash = require("connect-flash");
const mongoose =  require('mongoose');
const path = require("path");
const router = require("./Router/Router");

const app = express();
const server = require('http').createServer(app);

app.use(cookieparser());


app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
}));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(static(path.join(__dirname, "public")));
app.use(static(path.join(__dirname, "/")));

app.use(router);

app.use(function(req,res){ 
  res.status(404).render('pageNotFound',{title:"Content Not Found"});
})

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);


const mongoUri = process.env.DATABASE_TEST;

mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 25000, //in ms
});

if (!mongoUri) {
  throw new Error(`make sure that you are `);
}

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});


server.listen(app.get("port"), () => {
	console.log(`the app is listening at http://localhost:${app.get("port")}`);
});
