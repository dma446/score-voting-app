/**
 * David Acheampong
 * AIT
 * 4/5/19
 *  db.js
 */

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
//my schema goes here

const Voter = new mongoose.Schema({
    name: {type: String, required: true},
    hash: {type: String, required: true},
    voterid: {type: Number}
});

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