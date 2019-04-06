/**
 * David Acheampong
 * AIT
 * 4/5/19
 *  app.js
 */

const express = require('express');
const app = express();
require('./db');

const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');


app.listen(3000);