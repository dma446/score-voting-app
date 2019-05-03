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
    username: {type: String, required: true}
});

Voter.plugin(passportLocalMongoose);

const Candidate = new mongoose.Schema({
    name: {type: String, required: true},
    party: {type: String},
    electionid: {type: String, required: true},
    votes: [Number],
    score: Number
});

const Election = new mongoose.Schema({
    creator: {type: String, required: true},
    position: {type: String, required: true},
    candidates: [Candidate],
    voterids: [String]
});
/*
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    dbconf = 'mongodb://localhost/score';
}*/


const uri = process.env.MONGOLAB_URI;
const local = 'mongodb://localhost/score';

mongoose.model('Voter', Voter);
mongoose.model('Candidate', Candidate);
mongoose.model('Election', Election);
mongoose.connect(uri, { useNewUrlParser: true });
