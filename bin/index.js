#!/usr/bin/env node
'use strict';

const commander = require('commander');
const chalk = require('chalk');
const { spawn } = require('child_process');

const packageJson = require('../package.json');
const getNpmVersion = require('./utils/npmVersion');
const shouldUseYarn = require('./utils/shouldUseYarn');
const install = require('./install');
const questionnaire = require('./questionnaire');

const program = new commander.Command(packageJson.name).version(
  packageJson.version
);

const COMMANDS = {
  new: 'new',
};

program
  .command(`${COMMANDS.new} [appName]`)
  .description('Create new nextjs app')

  .action(function(appName) {
    if (typeof appName === 'undefined') {
      console.error('Please specify the project directory:');
      console.log(
        `  ${chalk.cyan(program.name())} new ${chalk.green(
          '<project-directory>'
        )}`
      );
      console.log();
      console.log('For example:');
      console.log(
        `  ${chalk.cyan(program.name())} new ${chalk.green('my-react-app')}`
      );
      console.log();
      console.log(
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
      );
      process.exit(1);
    }

    const useYarn = shouldUseYarn();

    if (!useYarn) {
      const { hasMinNpm, npmVersion } = getNpmVersion();
      if (hasMinNpm) {
        console.log(
          chalk.yellow(
            `You are using npm ${npmVersion} so the project will be boostrapped with an old unsupported version of tools.\n\n` +
              `Please update to npm 3 or higher for a better, fully supported experience.\n`
          )
        );
      }
    }

    questionnaire(function(selectedIndex) {
      install(useYarn, selectedIndex);
    });
  })
  .allowUnknownOption()
  .on('--help', function() {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
  });

if (invalid) {
  spawn('cna', ['--help'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  }).on('exit', function() {
    process.exit(1);
  });
}
