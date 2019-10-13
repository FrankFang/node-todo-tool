const api = require("./index.js");

const handleAdd = (...args) => {
  // args 总会带一个 commander 对象，所以这里要去掉
  const words = args.slice(0, args.length - 1);
  api
    .add(words.join(" "))
    .then(() => console.log("添加成功"), () => console.log("添加失败"));
};

const handleClear = () => {
  api
    .clear()
    .then(() => console.log("清除成功"), () => console.log("清除失败"));
};

const handleShowTodoList = () => {
  api.showAll().catch(() => console.log("获取数据失败"));
};

module.exports = {
  handleAdd,
  handleClear,
  handleShowTodoList
};
