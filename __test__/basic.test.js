'use strict';

const server = require('../src/sever');
const supergoose = require(' @code-fellows/supergoose');
const request = supergoose(server.server);
const basic = require('../src/auth/middleware/basic');
const base64 = require('base-64');
