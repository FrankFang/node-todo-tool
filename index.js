const inquirer = require("inquirer");
const db = require("./db.js");

const updateDb = async list => {
  await db.write(list);
};

const add = async title => {
  const list = await db.read();
  list.push({ title, done: false, create_at: new Date() });
  await updateDb(list);
};

const clear = async () => {
  await updateDb([]);
};

const handleSelectTask = (list, index) => {
  const taskHandler = {
    back: () => {
      showMainMenu();
    },
    markAsDone: async () => {
      list[index].done = true;
      await updateDb(list);
      showMainMenu();
    },
    markAsUndone: async () => {
      list[index].done = false;
      await updateDb(list);
      showMainMenu();
    },
    updateTitle: () => {
      inquirer
        .prompt({
          type: "input",
          name: "title",
          message: "新的标题",
          default: list[index].title
        })
        .then(async answers3 => {
          list[index].title = answers3.title;
          await updateDb(list);
          showMainMenu();
        });
    },
    remove: async () => {
      list.splice(index, 1);
      await updateDb(list);
      showMainMenu();
    }
  };
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "请选择操作",
      choices: [
        { name: "返回", value: "back" },
        { name: "已完成", value: "markAsDone" },
        { name: "未完成", value: "markAsUndone" },
        { name: "改标题", value: "updateTitle" },
        { name: "删除", value: "remove" }
      ]
    })
    .then(answers2 => {
      const handler = taskHandler[answers2.action];
      handler && handler();
    });
};

const handleAddTask = () => {
  return inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "输入任务标题"
    })
    .then(async answers3 => {
      if (!answers3.title) {
        console.log("需要输入一个任务标题");
        return;
      }
      await add(answers3.title);
    });
};

const handleMainMenuSelect = async (list, answers) => {
  const index = parseInt(answers.index);
  if (index >= 0) {
    handleSelectTask(list, index);
    return;
  }
  if (index === -2) {
    await handleAddTask();
    showMainMenu();
  }
};

const showMainMenu = async () => {
  const list = await db.read();
  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择你要进行的操作",
      choices: [
        { name: "- 退出程序", value: "-1" },
        { name: "+ 创建任务", value: "-2" },
        new inquirer.Separator(),
        ...list.map((task, index) => {
          return {
            name: `(${index + 1})${task.done ? "[完成]" : "[未完成]"} ${
              task.title
            } 创建时间：${new Date(task.create_at).toLocaleString()}`,
            value: index.toString(),
            short: task.title
          };
        })
      ]
    })
    .then(answers => {
      handleMainMenuSelect(list, answers);
    });
};

const showAll = async () => {
  showMainMenu();
};

module.exports = {
  add,
  clear,
  showAll
};
