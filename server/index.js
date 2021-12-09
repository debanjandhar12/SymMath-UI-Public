const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const msal = require("@azure/msal-node");
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(express.json());
app.set('views', path.join(__dirname, '/../public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
const msalConfig = {
  auth: {
    clientId: "secret",
    authority:
      "https://login.microsoftonline.com/consumers",
    clientSecret: "secret"
  }
};
const cca = new msal.ConfidentialClientApplication(msalConfig);
const SymMathDB = require("./SymMathDB.js");SymMathDB.initialize();

app.get("/", async (req, res) => {
  if (!req.session.user) {
    // Redirect user for login
    const authCodeUrlParameters = {
      scopes: ["user.read"],
      redirectUri: `${process.argv.slice(2)}/redirect`,
    };
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
      res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
  } else {
    res.render('index.html', { user: JSON.stringify(req.session.user) });
  }
});

app.get('/redirect', (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: `${process.argv.slice(2)}/redirect`,
  };

  cca.acquireTokenByCode(tokenRequest).then((response) => {
    req.session.user = response.account;
    res.redirect("/");
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

app.get('/getEqnList.json', (req, res) => {
  if(!req.session.user) {res.status(500).send("You are not logged in!"); return;}
  SymMathDB.getEqnSheet(req.session.user.username).then((eqns) => {
    res.json(eqns);
  });
});

app.all('/setEqnList.json', (req, res) => {
  if(!req.session.user) {res.status(500).send("You are not logged in!"); return;}
  if(!req.body.equation_list) {res.status(500).send("Please supply a equation_list."); return;}
  SymMathDB.setEqnSheet(req.session.user.username, req.body.equation_list);
  res.json([]);
});

app.use('/', express.static(path.join(__dirname, '/../public')));

app.listen(8080);

