//here we import the necessary dependencies for our server
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
//we will be importing a helpers function for our date 
const helpers = require('./utils/helpers');
//in the next line of codes we will be adding handlebars 
const handlebars = require('express-handlebars');
const handlebars= handlebars.create({ helpers });
//we will be adding session
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const expSession = {
    secret: 'Super password',
    cookie: { maxAge: 3600 },
    resize: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
//here we are adding the session to our server
app.use(session(expSession));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//we will be adding handlebars to our server
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//we will be adding routes to our server
app.use(routes);
//we will be adding sequelize to our server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
}
);
