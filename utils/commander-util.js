const program = require("commander");

const commander_registerCommands = commandItems => {
  commandItems.forEach(commandItem => {
    program
      .command(commandItem.argName)
      .description(commandItem.description)
      .action(args => {
        commandItem.handleAction(args);
      });
  });
};

const commander_handleNoArgs = callback => {
  if (process.argv.length === 2) {
    callback();
  }
};

const commander_init = () => {
  program.parse(process.argv);
};

module.exports = {
  commander_registerCommands,
  commander_init,
  commander_handleNoArgs
};
