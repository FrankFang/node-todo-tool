#!/usr/bin/env node
const {
  commander_registerCommands,
  commander_init,
  commander_handleNoArgs
} = require("./utils/commander-util.js");
const { handleAdd, handleClear, handleShowTodoList } = require("./cli-handler");

commander_registerCommands([
  {
    argName: "add",
    description: "add a task",
    handleAction: handleAdd
  },
  {
    argName: "clear",
    description: "clear all tasks",
    handleAction: handleClear
  }
]);

commander_init();
commander_handleNoArgs(handleShowTodoList);
