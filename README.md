# node-todo-tool

一个简单的可以添加 Todo 的命令行工具

## 安装

```bash
# npm
npm install node-todo-tool -g

# yarn
yarn global add nodo-todo-tool
```

## 示例

![demo](https://github.com/nbhaohao/node-todo-tool/blob/master/demo.gif)

## 使用说明
会在当前用户的 "家目录下" 创建一个名为 `.node_todo_tool_db` 来存储数据。

命令示例：
``` bash
node-todo -h # 查看所有可用命令
node-todo # 显示主菜单
node-todo add <taskName> # 添加一个 todo
node-todo clear # 清空当前所有数据
```
