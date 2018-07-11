const cls = require('./cls/main');
const clc = require('cli-color');
const cfonts = require('cfonts');
var npmPackage = require('npm-package-info')
const { badges } = require('./elements')

function printBadges(packageJson) {
  let badgesStr = ` `;
  if (packageJson.version) {
    badgesStr += badges.success('version', packageJson.version) + ' ';
  }
  if (packageJson.license) {
    badgesStr += badges.info('license', packageJson.license) + ' ';
  }
  console.log(badgesStr);
}

function formatPackageJson(packageJson, program) {

  let print = {
    badges: true,
    description: true,
    info: true,
    keywords: true,
    deps: true,
    devdeps: true,
    npmlink: true,
    details: true,
    scripts: false
  }

  if (program.only) {
    print = {
      badges: false,
      description: false,
      info: false,
      keywords: false,
      deps: false,
      npmlink: false,
      details: false,
      scripts: false
    }
    print[program.only] = true;
  }

  if (program.devdeps) {
    print.devdeps = true;
  }

  if (typeof packageJson === 'string') {
    packageJson = JSON.parse(packageJson);
  }

  let titleOpts = {
    font: 'chrome',
    align: 'left',
    colors: ['blue', 'blueBright', 'blue'],
    background: 'transparent',
    space: false,
    color: 1
  };

  let descOpts = {
    font: 'console',
    align: 'left',
    colors: ['gray', 'cyan', 'blue'],
    background: 'transparent',
    space: false,
    color: 2
  };

  if (packageJson.pckg_info && packageJson.pckg_info.title.font) {
    titleOpts.font = packageJson.pckg_info.title.font;
  }
  if (packageJson.pckg_info && packageJson.pckg_info.title.colors) {
    titleOpts.colors = packageJson.pckg_info.title.colors;
  }
  if (packageJson.pckg_info && packageJson.pckg_info.title.align) {
    titleOpts.align = packageJson.pckg_info.title.align;
  }
  if (packageJson.pckg_info && packageJson.pckg_info.title.background) {
    titleOpts.background = packageJson.pckg_info.title.background;
  }
  if (packageJson.pckg_info && packageJson.pckg_info.title.space) {
    titleOpts.space = packageJson.pckg_info.title.space;
  }
  if (packageJson.pckg_info && packageJson.pckg_info.title.color) {
    titleOpts.color = packageJson.pckg_info.title.color;
  }


  cfonts.say(
    packageJson.name,
    titleOpts
  );

  if (print.badges) printBadges(packageJson);

  console.log('_'.repeat(64))

  if (print.description) console.log(cls.text.white.bold(`\n ${packageJson.description}`));
  if (print.info && (packageJson.homepage || packageJson.repository)) {
    console.log(clc.bold('\n Info: '));
    if (packageJson.homepage) {
      console.log('  - Site: ' + cls.text.gray(packageJson.homepage));
    }

    if (packageJson.repository) {
      console.log('  - Repo: ' + cls.text.gray(packageJson.repository.url));
    }

    if (print.npmlink) {
      console.log('  - Npm:  ' + cls.text.gray(`https://www.npmjs.com/package/${packageJson.name}`));
    }
  }
  if (print.keywords && packageJson.keywords) {
    console.log(clc.bold('\n Keywords: '));

    let kstr = ' ';
    for (let keyword of packageJson.keywords) {
      kstr += cls.label.info(` ${keyword} `) + ' ';
    }
    console.log(' ' + kstr);
  }


  if (print.deps || print.devdeps) {
    let titleStr = '\n';
    let partLength = 60;
    let p1t = ' Dependencies: ';
    let p2t = 'Dev Dependencies: ';

    let depsKeys = [];
    let devDepsKeys = [];
    if (print.deps && packageJson.dependencies) {
      titleStr += clc.bold(p1t + ' '.repeat(partLength - p1t.length));
      depsKeys = Object.keys(packageJson.dependencies);
    }
    if (print.devdeps && packageJson.devDependencies) {
      titleStr += clc.bold(p2t);
      devDepsKeys = Object.keys(packageJson.devDependencies);
    }
    console.log(titleStr);

    let depsL = depsKeys.length;
    let ddepsL = devDepsKeys.length;

    let len = depsL > ddepsL ? depsL : ddepsL;

    let depsStr = '';
    for (let i = 0; i < len; i++) {

      let lkey = depsKeys[i];
      let rkey = devDepsKeys[i];
      let addNL = false;

      if (lkey && print.deps) {
        let dep = packageJson.dependencies[lkey];
        let ds = '  - ' + lkey + ': ' + clc.cyan(dep);
        depsStr += ds + ' '.repeat(partLength - ds.length + 9);
        addNL = true;
      }
      if (rkey && print.devdeps) {
        let dep = packageJson.devDependencies[rkey];
        let ds = '  - ' + rkey + ': ' + clc.cyan(dep);
        depsStr += ds + ' '.repeat(partLength - ds.length + 9);
        addNL = true;
      }
      if (addNL) {
        depsStr += '\n'
      }
    }
    console.log(depsStr);
  }

  if (print.scripts && packageJson.scripts) {
    console.log(clc.bold(' Scripts: '));
    let kstr = ' ';
    for (let scrName in packageJson.scripts) {
      let scr = packageJson.scripts[scrName]
      console.log('  ' + cls.text.white(scrName) + ': ' + clc.cyan(scr));
    }
  }

  let name = packageJson.author && packageJson.author.name ? packageJson.author.name : packageJson.author;
  let email = packageJson.author && packageJson.author.email ? packageJson.author.email : '';

  if (name) {
    process.stdout.write('\n by: ' + name + '\n');
  }
}

module.exports = formatPackageJson;