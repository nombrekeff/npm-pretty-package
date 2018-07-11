const cls = require('./main');
/*
  Test for cli shorthands

*/

let labelSuccs = cls.label.success;
let labelError = cls.label.error;
let labelWarn = cls.label.warning;
let labelInfo = cls.label.info;

let labelSuccsB = cls.label.successBright;
let labelErrorB = cls.label.errorBright;
let labelWarnB = cls.label.warnBright;
let labelInfoB = cls.label.infoBright;

let textSuccs = cls.text.success;
let textError = cls.text.error;
let textWarn = cls.text.warning;
let textInfo = cls.text.info;

let textSuccsB = cls.text.successBright;
let textErrorB = cls.text.errorBright;
let textWarnB = cls.text.warnBright;
let textInfoB = cls.text.infoBright;

let labelWhite = cls.label.white;

process.stdout.write(
  `
  ${labelWhite(' cls ')}
   |
   |\`-- ${labelWhite(' label ')}
   |      |
   |      |-- ${labelSuccs(' success ')}
   |      |\`-- ${labelSuccsB(' successBright ')}
   |      |
   |      |-- ${labelError(' error ')}
   |      |\`-- ${labelErrorB(' errorBright ')}
   |      |
   |      |-- ${labelWarn(' warning ')}
   |      |\`-- ${labelWarnB(' warnBright ')}
   |      |
   |      |-- ${labelInfo(' info ')}
   |       \`-- ${labelInfoB(' infoBright ')}
   |
   |\`-- ${labelWhite(' text ')}
   |     |-- ${textSuccs(' success ')}
   |     |\`-- ${textSuccsB(' successBright ')}
   |     |
   |     |-- ${textError(' error ')}
   |     |\`-- ${textErrorB(' errorBright ')}
   |     |
   |     |-- ${textWarn(' warning ')}
   |     |\`-- ${textWarnB(' warnBright ')}
   |     |
   |     |-- ${textInfo(' info ')}
   |      \`-- ${textInfoB(' infoBright ')}
   |
    \`-- ${labelWhite(' checkbox ')}
         |
         |\`-- ${cls.checkbox(true, ' checked ')}
         |
          \`-- ${cls.checkbox(false, ' unchecked ')}
  `
)
