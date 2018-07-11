const clc = require('cli-color');
// clc.xterm(202)

for (var i = 0; i < 256; i++) {
  console.log('['+i+'] - '+clc.xterm(i)('Development not found'));
}
