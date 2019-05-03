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
    if (req.isAuthenticated()) {
        res.redirect("/elections");
    } else {
        res.render('home');
    }
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
    if (req.isAuthenticated()) {
        const content = {};
        const filter = req.query.filter;
        const input = req.query.input;
        if (input !== '') {
            if (filter === "position") {
                Election.find({position: input}, (err, elections, count) => {
                    const voterid = String(req.user._id);
                    elections.forEach((election) => {
                        if (election.voterids.includes(voterid)) {
                            election.hasVoted = true;
                        }
                        if (election.creator === req.user.username) {
                            election.isCreator = true;
                        }
                        election.electionData = JSON.stringify(election);
                    });
                    content.elections = elections;
                    res.render('elections', content);
                });
            } else if (filter === "creator") {
                Election.find({creator: input}, (err, elections, count) => {
                    const voterid = String(req.user._id);
                    elections.forEach((election) => {
                        if (election.voterids.includes(voterid)) {
                            election.hasVoted = true;
                        }
                        if (election.creator === req.user.username) {
                            election.isCreator = true;
                        }
                        election.electionData = JSON.stringify(election);
                    });
                    content.elections = elections;
                    res.render('elections', content);
                });
            } else if (filter === "electionid") {
                Election.find({_id: input}, (err, elections, count) => {
                    const voterid = String(req.user._id);
                    elections.forEach((election) => {
                        if (election.voterids.includes(voterid)) {
                            election.hasVoted = true;
                        }
                        if (election.creator === req.user.username) {
                            election.isCreator = true;
                        }
                        election.electionData = JSON.stringify(election);
                    });
                    content.elections = elections;
                    res.render('elections', content);
                });
            }
        }
        
        else {
            Election.find((err, elections, count) => {
                const voterid = String(req.user._id);
                elections.forEach((election) => {
                    if (election.voterids.includes(voterid)) {
                        election.hasVoted = true;
                    }
                    if (election.creator === req.user.username) {
                        election.isCreator = true;
                    }
                    election.electionData = JSON.stringify(election);
                });
                content.elections = elections;
                res.render('elections', content);
            });
        }
    } else {
        res.redirect('/');
    }
});


app.get('/elections/create', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('create-election');
    } else {
        res.redirect('/');
    }
});

//WILL CHANGE!!!
app.post('/elections/create', (req, res) => {
    const electionid = mongoose.Types.ObjectId();
    const names = req.body.names;
    const parties = req.body.parties;
    const numOfCandidates = names.length;
    const candidateArray = new Array(numOfCandidates);
    for (let i = 0; i < numOfCandidates; i++) {
        const candidate = new Candidate({
            name: sanitize(names[i]),
            party: sanitize(parties[i]),
            electionid: electionid
        });
        candidateArray[i] = candidate;
    }

    async.forEach(candidateArray, (candidateObj, callback) => {
        candidateObj.save((err, item) => {
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
                const election = new Election({
                    _id: electionid,
                    creator: req.user.username,
                    position: sanitize(req.body.position),
                    candidates: candidates 
                });
                election.save((err, elections, count) => {
                    if (err) {
                        res.render('create-election', {error: "Sorry. Something went wrong." + err});
                    }
                    console.log(election.candidates);
                    res.redirect('/elections');
                });
            });
        }
    });  
});

app.get('/elections/voting', (req, res) => {
    if (req.isAuthenticated()) {
        Election.find({_id: req.query.electionid}, (err, election, count) => {
            const content = {
                election: election[0],
                candidates: election[0].candidates
            };
            res.render('voting', content);                 
        }); 
    } else {
        res.redirect('/');
    }
});

app.post('/elections/voting', (req, res) => {
    Election.findByIdAndUpdate(req.body.electionid, {"$push": {voterids: req.user._id}}, {"new": true}, (err, election) => {
        if (err) {
            res.status = 500;
            res.send(err);
        }
        const candidates = election.candidates;
        for (let i = 0; i < candidates.length; i++) {
            const vote = req.body['score-'+candidates[i].name];
            candidates[i].votes.push(vote);
            const total = candidates[i].votes.reduce((acc, currVote) => acc + currVote);
            candidates[i].score = total / candidates[i].votes.length;
        }
        election.markModified('candidates');
        election.save((err, updatedElection, count) => {
            console.log(err, updatedElection);
            res.redirect('/elections');
        });
    });
});

app.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/elections');
    } else {
        res.render('register');
    }
});

app.post('/register', (req, res) => {
    Voter.register(new Voter({username: req.body.username}), 
    req.body.password, (err, user) => {
        if (err) {
            res.render('register', {error: 'Sorry, your registration information is not valid.' + err});
        } 
        passport.authenticate('local')(req, res, () => {
            res.redirect('/elections');
        });
    });
});



module.exports = router;

app.listen(process.env.PORT || 3000);