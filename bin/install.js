#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const createPackageJson = require('./create-pkg');
const TEMPLATES = require('./template');

module.exports = function(userYarn, selectedIndex) {
  const appName = process.argv[3];

  const pathName = path.join(process.cwd(), appName);
  const appNameExists = fs.existsSync(pathName);
  const template = TEMPLATES[selectedIndex];

  if (!template) {
    console.log(chalk.red('Template not found with your option. 😕 😕 😕'));
    process.exit(1);
  }

  const templatesPath = path.join(__dirname, '..', template.path);

  if (!appNameExists) {
    fs.ensureDirSync(pathName);
    fs.copySync(templatesPath, pathName);

    createPackageJson(appName);

    const packageManager = userYarn ? 'yarn' : 'npm';

    const install = spawn(packageManager, ['install'], {
      cwd: pathName,
      stdio: 'inherit',
    });
    install.on('exit', function(code) {
      console.log(chalk.cyan('Completed setting up project!!! 🎊 🎉'));
      console.log('\n\nHappy hacking!');
      process.exit(code);
    });
  } else {
    console.log(chalk.red('Project name is already existed. 😕 😕 😕'));
  }
};
