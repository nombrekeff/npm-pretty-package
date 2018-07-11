'use strict';
const program = require('commander');
const packageJson = require('./package.json');
const colors = require('cli-color');
const path = require("path");
const fs = require('fs');
const format = require('./lib/formatter');

const cwd = path.resolve("./");
const node_modules_path = cwd + '/node_modules';

if (!fs.existsSync(cwd + '/package.json')) {
  console.log(make_red('\n  ERROR: please make sure you are in a npm project directory: no-package-json'));
  return 1;
}


program.version(packageJson.version)
  .usage('<package-name>')
  .option('-d, --devdeps', 'Show dev dependencies')
  .option('-g, --global', 'Global package #in-development')
  .option('-o, --only <section>', 'Show only a section');

program.parse(process.argv)

// Errors and help
if (!process.argv.slice(2).length) {
  return program.outputHelp(make_red);
}

if (program.global) {
  console.log(make_red('\n  ERROR: -g --global options is in development'));
  program.outputHelp((txt) => txt);
  return 1;
}


let [pckgName] = program.args;
if (!pckgName) {
  console.log(make_red('\n  ERROR: <package-name> is required'));
  program.outputHelp((txt) => txt);
  return 1;
}

// Were good
const pckg_json_path = node_modules_path + '/' + pckgName + '/package.json';
if (!fs.existsSync(pckg_json_path)) {
  console.log(make_red(`\n  ERROR: package ${pckgName} is not installed`));
  return 1;
}

const pckg_json_content = fs.readFileSync(pckg_json_path).toString();
format(pckg_json_content, program);


function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}