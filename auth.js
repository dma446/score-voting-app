const mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Voter = mongoose.model('Voter');

passport.use(new LocalStrategy(Voter.authenticate()));

passport.serializeUser(Voter.serializeUser());
passport.deserializeUser(Voter.deserializeUser());