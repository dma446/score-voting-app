/**
 * David Acheampong
 * AIT
 * 4/5/19
 *  app.js
 */



require('./db');
require('./auth');
const express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    sanitize = require('mongo-sanitize'),
    Voter = mongoose.model('Voter'),
    Candidate = mongoose.model('Candidate'),
    Election = mongoose.model('Election');
const app = express();
const async = require('async');
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

/*function approveDomains(opts, certs, cb) {
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
    challenges: { 'http-01': require('le-challenge-fs').create({ webrootPath: '/tmp/acme-challenges' }) }, 
    store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' }),
    approveDomains: approveDomains
});*/

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/', (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (user) {
                req.logIn(user, (err) => {
                    res.redirect('/elections');
                });
            } else {
                res.render('home', {error: 'Your username or password is incorrect.'});
            }
        })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

app.get('/elections', (req, res) => {
    const content = {};
    Election.find((err, elections, count) => {
        content.elections = elections;
        //content.username = res.locals.user;
        res.render('elections', content);
    });
});


app.get('/elections/create', (req, res) => {
    res.render('create-election');
});

//WILL CHANGE!!!
app.post('/elections/create', (req, res) => {
        const electionid = Math.floor(Math.random() * 500);
        const names = req.body.names;
        const parties = req.body.parties;
        const numOfCandidates = names.length;
        const candidateArray = new Array(numOfCandidates);
        for (let i = 0; i < numOfCandidates; i++) {
            const candidate = new Candidate({
                name: sanitize(names[i]),
                party: sanitize(parties[i]),
                electionid: sanitize(electionid)
            });
            candidateArray[i] = candidate;
        }
    
        async.forEach(candidateArray, (candidate, callback) => {
            candidate.save((err, item) => {
                if (err) {
                    console.log(err);
                }
                callback();
            });
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Everything saved');
                Candidate.find({electionid: electionid}, (err, candidates, count) => {
                new Election({
                    position: sanitize(req.body.position),
                    electionid: sanitize(electionid),
                    candidates: sanitize(candidates)
                }).save((err, elections, count) => {
                    if (err) {
                        res.render('create-election', {error: "Sorry. Something went wrong." + err});
                    } else {
                        res.redirect('/elections');
                    }
                });
            });
            }
        });  
});


app.get('/elections/voting', (req, res) => {
    Election.find({electionid: req.query.electionid}, (err, election, count) => {
        const content = {
            election: election[0],
            candidates: election[0].candidates
        };
        res.render('voting', content);                 
    }); 
});

app.post('/elections/voting', (req, res) => {
    Election.find({electionid: req.body.electionid}, (err, election, count) => {
        const candidates = election[0].candidates;
        async.forEach(candidates, (candidate, callback) => {
            candidate.votes.push(req.body['score-' + candidate.name]);
            candidate.save((err, item) => {
                if (err) {
                    console.log(err);
                }
                callback();
            });
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Everything saved');
                res.redirect('/elections');
            }
        }); 
    });
});

app.post('/elections/voting', (req, res) => {
    console.log(req.body['score-Tim']);
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    Voter.register(new Voter({username: req.body.username}), 
        req.body.password, (err, user) => {
            if (err) {
                res.render('register', {error: 'Sorry, your registration information is not valid.' + err});
            } else if (req.body.password !== req.body.confirm) {
                Voter.remove({username: req.body.username}, (err) => {
                    if (err) {
                        console.log('oh noes');
                    } else {
                        res.render('register', {error: 'Passwords do not match!'});
                    }
                });
      
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/elections');
                });
            }
        });
});

module.exports = router;

app.listen(process.env.PORT || 3000);