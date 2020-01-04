require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      gradient = require('gradient-string'),
      authCtrl = require('./authCtrl'),
      catCtrl = require('./catCtrl'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive(CONNECTION_STRING).then(db=>{
    app.set('db', db);
    console.log(gradient.summer('DB connected'));
})

// ===== ===== AUTH ===== =====

app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
app.get('/api/user', authCtrl.checkUser)

// ===== ===== CATEGORY =====

app.post('/api/category', catCtrl.addCat)
app.get('/api/category', catCtrl.getCat)
app.delete('/api/category/:id', catCtrl.deleteCat)

// ===== ===== ===== ===== ====

const port = SERVER_PORT;
app.listen(port, () => console.log(gradient.fruit(`port: ${port}`)));