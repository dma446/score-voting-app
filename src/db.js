/**
 * David Acheampong
 * AIT
 * 4/5/19
 *  db.js
 */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const URLSlugs = require('mongoose-url-slugs');
//my schema goes here

const Voter = new mongoose.Schema({
    voterid: {type: Number}
});

Voter.plugin(passportLocalMongoose);

const Candidate = new mongoose.Schema({
    name: {type: String, required: true},
    party: {type: String, required: false},
    candidateid: {type: Number},
    votes: []
});

const Election = new mongoose.Schema({
    position: {type: String, required: true},
    elcetionid: {type: Number},
    candidates: [Candidate],
    votesrs: []
});

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'src/config.json');
    const data = fs.readFileSync(fn);

    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    dbconf = 'mongodb://localhost/dma446';
}
mongoose.model('Voter', Voter);
mongoose.model('Candidate', Candidate);
mongoose.model('Election', Election);
mongoose.connect(dbconf, { useNewUrlParser: true });
