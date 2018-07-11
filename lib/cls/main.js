const clc = require('cli-color');

const error   = clc.red.bold;
const warn    = clc.yellow;
const succs   = clc.green;
const notice  = clc.blue;

const labelFactory = function(cl = 'white', bg = 'bgBlack') {
  return clc[cl][bg];
}
const xtermLabelFactory = function(cl = 255, bg = 0) {
  return clc.xterm(cl).bgXterm(bg);
}

const label = {};
label.success = labelFactory('whiteBright', 'bgGreen');
label.error   = labelFactory('whiteBright', 'bgRed');
label.warning = labelFactory('whiteBright', 'bgYellow');
label.info    = labelFactory('whiteBright', 'bgBlue');
label.white   = xtermLabelFactory(236, 254);

label.successBright = xtermLabelFactory(255, 47);
label.errorBright   = xtermLabelFactory(255, 196);
label.warnBright    = xtermLabelFactory(237, 226);
label.infoBright    = xtermLabelFactory(255, 27);

const text = {};
text.success = clc.green;
text.error   = clc.red;
text.warning = clc.yellow;
text.info    = clc.blue;
text.cyan    = clc.cyan;
text.white    = clc.white;
text.gray    = clc.xterm(8);
text.magenta = clc.xterm(13);
text.pink    = clc.xterm(129);

text.successBright = clc.greenBright;
text.errorBright   = clc.redBright;
text.warnBright    = clc.yellowBright;
text.infoBright    =  clc.blueBright;

let checkbox = function(checked, txt){
  return `[${checked ? text.success('X'): text.error(' ')}] ${txt}`;
}


module.exports = {
  label,
  text,
  checkbox,
  columns: clc.columns
}
