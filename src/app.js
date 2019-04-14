/**
 * David Acheampong
 * AIT
 * 4/5/19
 *  app.js
 */

'use strict';

require('./db');
require('./auth');

const express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    sanitize = require('mongo-sanitize'),
    Voter = mongoose.model('Voter'),
    Election = mongoose.model('Election');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const session = require('express-session');
const sessionOptions = {
    secret: "dalkfjdalf",
    resave: true,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use(express.static(publicPath));

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.set('view engine', 'hbs');

function approveDomains(opts, certs, cb) {
    if (certs) {
        opts.domains = certs.altnames;
    } else {
        opts.email = 'dma446@nyu.edu';
        opts.agreeTos = true;
    }
    cb(null, {options: opts, certs: certs});
}

const greenlock = require('greenlock-express').create({
    version: 'draft-11',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    challenges: { 'dns-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }, 
    store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' }),
    approveDomains: approveDomains
});


app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res, next) => {
    if (req.body.logout === true) {
        passport.authenticate('local', (err, user) => {
            if (user) {
                req.logOut(user, (err) => {
                    res.redirect('/');
                });
            } else {
                res.redirect('/', {error: 'Didn\'t log out properly!'});
            }  
        });   
    } else {
        passport.authenticate('local', (err, user) => {
            if (user) {
                req.logIn(user, (err) => {
                    res.redirect('/elections');
                });
            } else {
                res.render('home', {error: 'Your username or password is incorrect.'});
            }
        })(req, res, next);
    }
});

app.get('/elections', (req, res) => {
    const content = {};

    Election.find((err, elections, count) => {
        content.elections = elections;
        res.render('elections', content);
    });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    Voter.register(new Voter({username: req.body.username}), 
        req.body.password, (err, user) => {
            if (err) {
                res.render('register', {error: 'Sorry, your registration information is not valid.'});
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/elections');
                });
            }
        });
});

module.exports = router;

app.listen(process.env.PORT || 3000);