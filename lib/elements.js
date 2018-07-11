'use strict';
const cls = require('./cls/main');
const clc = require('cli-color');

const badgeFactory = function (keyLbl, valueLbl, key, value) {
  return function (key, value) {
    return keyLbl(` ${key} `) + valueLbl(` ${value} `);
  }
}

const badgeSuccess = badgeFactory(cls.label.white, cls.label.successBright);
const badgeError = badgeFactory(cls.label.white, cls.label.error);
const badgeWarning = badgeFactory(cls.label.white, cls.label.warnBright);
const badgeInfo = badgeFactory(cls.label.white, cls.label.infoBright);
const badgeWhite = badgeFactory(cls.label.white, cls.label.white);


const badges = {
  success: badgeSuccess,
  error: badgeError,
  info: badgeInfo,
  warning: badgeWarning,
  factory: badgeFactory
}

function buildStep(what, parts) {
  return badgeWhite(what, parts.join(' '));
}

// console.log(buildStep('DEBUG', ['START', 'env:prod', 'debug:true']));
// console.log(buildStep('DEBUG', ['Setup stuff']));
// console.log(buildStep('DEBUG', ['Compress some other stuff']));
// console.log(buildStep('INFO', ['User has no tool for that']));
// console.log(badgeInfo('Build nº', '#106'));
// console.log(badgeSuccess('Status  ', 'OK'));
// console.log(badgeWarning('Quality ', 'C'));
// console.log(badgeWhite('Time    ', '203ms'));
module.exports = {
  badges
}