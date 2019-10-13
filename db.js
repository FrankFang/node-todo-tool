const os = require("os");
const fs = require("fs");
const path = require("path");
const homePath = process.env.HOME || os.homedir();
const dbPath = path.join(homePath, ".node_todo_tool_db");
const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (error, content) => {
        if (error) {
          return reject(error);
        }
        let list;
        try {
          list = JSON.parse(content.toString());
        } catch (error2) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write(list, path = dbPath) {
    const listStringify = JSON.stringify(list);
    return new Promise((resolve, reject) => {
      fs.writeFile(path, listStringify, error => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
};

module.exports = db;
