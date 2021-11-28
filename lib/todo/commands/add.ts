import Conf from "conf";
import {TodoItem} from "@/todo/commands/list.js";
import * as chalk from "chalk";
import {L} from "@/utils/log.js";

const conf = new Conf();

export function add(task: string) {
  // get the current todo.js-list
  let todoList = conf.get('todo.js-list') as (TodoItem[] | undefined);

  if (!todoList) {
    todoList = [];
  }

  todoList.push({
    text: task,
    done: false
  });

  conf.set('todo.js-list', todoList);

  L(chalk.green.bold('Task has been added successfully!'));
}